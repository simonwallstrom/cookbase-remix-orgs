import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ArrowFatLeft, DotsThreeOutline, Pencil } from 'phosphor-react'
import invariant from 'tiny-invariant'
import { getRecipe } from '~/models/recipe.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request, params }: LoaderArgs) {
  const { orgId } = await requireAuth(request)
  invariant(params.recipeId, 'noteId not found')

  const recipe = await getRecipe({ organizationId: orgId, id: params.recipeId })
  if (!recipe) {
    throw new Response('Not found', { status: 404 })
  }

  return recipe
}

export default function Recipe() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/recipes"
            className="flex rounded-full border border-black bg-white p-2 font-medium text-black shadow-flat hover:bg-gray-200"
          >
            <ArrowFatLeft weight="duotone" size={20} />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex rounded-full border border-black bg-white p-2 font-medium text-black shadow-flat hover:bg-gray-200">
            <Pencil weight="duotone" size={20} />
          </button>
          <div>
            <button className="flex rounded-full border border-black bg-white p-2 font-medium text-black shadow-flat hover:bg-gray-200">
              <DotsThreeOutline weight="duotone" size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="box mt-8 overflow-hidden">
        {data.imgUrl ? (
          <img
            className="aspect-[2/1] w-full border-b border-black object-cover"
            src={data.imgUrl}
            alt=""
          />
        ) : null}
        <div className="px-10 py-8">
          <h1>{data.title}</h1>
          <div className="mt-2 flex flex-col gap-3.5 border-b-2 border-black pb-8">
            <div className="flex items-center gap-2">
              <div>
                Simon Wallström <span className="text-gray-500">created this recipe</span> 7 days
                ago
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* <div className="text-xs uppercase tracking-wider text-gray-500">Tags:</div> */}
              {data.tags.map((tag) => (
                <div className="rounded-full bg-gray-200 px-1.5 py-0.5 text-xs" key={tag.id}>
                  {tag.title}
                </div>
              ))}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="mt-6"></div>
        </div>
      </div>
    </div>
  )
}
