import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { DotsThreeOutline } from 'phosphor-react'
import invariant from 'tiny-invariant'
import { prisma } from '~/utils/prisma.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request, params }: LoaderArgs) {
  const { orgId } = await requireAuth(request)

  invariant(params.recipeId, 'recipeId not found')

  const recipe = await prisma.recipe.findFirst({
    where: { id: params.recipeId, organizationId: orgId },
    include: { collections: true },
  })

  if (!recipe) {
    throw new Response('Not found', { status: 404 })
  }

  return recipe
}

export default function Recipe() {
  const data = useLoaderData<typeof loader>()
  return (
    <div className="relative">
      {data.imgUrl ? (
        <div>
          <img
            className="aspect-square w-24 -rotate-3 rounded-2xl object-cover"
            src={data.imgUrl}
            alt=""
          />
        </div>
      ) : null}
      <div className="flex items-center gap-10 border-b border-gray-100 py-8">
        <div>
          <h1 className="flex items-center gap-3">
            <span>{data.title}</span>
            <button className="rounded-md p-1 hover:bg-gray-200">
              <DotsThreeOutline weight="fill" size={18} />
            </button>
          </h1>
          <div className="mt-2 flex flex-col gap-3.5">
            <div className="flex items-center gap-2">
              <div>
                Simon <span className="text-gray-500">created this recipe</span> 7 days ago
              </div>
            </div>
            {data.collections.length ? (
              <div className="mt-2 flex items-center gap-2">
                {data.collections.map((collection) => (
                  <Link
                    to={'/'}
                    className="flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs hover:bg-gray-200"
                    key={collection.id}
                  >
                    <span>🌽</span>
                    <span>{collection.title}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mt-7 flex gap-10">
        <div className="w-[30%]">
          <h2>Ingredients</h2>
          <div className="mt-3">
            <ul className="list-inside list-disc leading-[1.7]">
              <li>Freshly ground beef</li>
              <li>1kg Wheat flour</li>
              <li>1 liter tepid water</li>
              <li>American cheese</li>
              <li>Salt</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h2>Instructions</h2>
          <div className="tiptap mt-3 leading-[1.7]">
            <ol>
              <li>
                You start by placing two two-ounce patties on the surface of a hot (and I mean hot)
                griddle. These are relatively high-fat patties, made with a combination of short
                rib, brisket, and sirloin.
              </li>
              <li>
                We tried a whole host of instruments for smashing our patties before settling on a
                plastering trowel, which is essentially a steel plate attached to a wooden handle.
                It gives you good leverage, which is important—remember, we're smashing petite
                two-ounce patties down to a size that's wide enough to fit on a standard burger bun.
              </li>
              <li>
                Next up, the patties get seasoned with salt and pepper. When you've got great beef,
                this is the only additional flavoring it needs. Think of it as a suit and tie for
                your patties.
              </li>
            </ol>
          </div>
        </div>
      </div>
      {/* <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="tiptap mt-4 text-[15px] leading-relaxed md:mt-7"
        ></div> */}
    </div>
  )
}
