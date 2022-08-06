import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { DotsThreeOutline, Pencil } from 'phosphor-react'
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
      <div>
        <Link to="/recipes">← Back to all recipes</Link>
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
          <div className="flex items-center justify-between">
            <h1>{data.title}</h1>
            <div className="flex items-center gap-1">
              <button className="flex rounded-full p-2 hover:bg-gray-100">
                <Pencil weight="duotone" size={20} />
              </button>
              <div>
                <button className="flex rounded-full p-2 hover:bg-gray-100">
                  <DotsThreeOutline weight="duotone" size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="flex">
            {data.tags.map((tag) => (
              <div className="mt-1 rounded bg-yellow-200 px-1 text-xs" key={tag.id}>
                {tag.title}
              </div>
            ))}
          </div>
          <p className="mt-2 leading-relaxed">{data.content}</p>
          <hr className="my-6 border-dashed" />
          <div>
            <h2>Ingredients</h2>
            <ul className="mt-2 list-inside list-disc leading-relaxed">
              <li>Ground Beef, 80/20</li>
              <li>Butter</li>
              <li>Garlic Salt</li>
              <li>Pepper</li>
              <li>Cheddar Cheese</li>
              <li>Hamburger Buns</li>
              <li>Butter, Melted</li>
              <li>Leaf Lettuce</li>
              <li>Tomato, sliced</li>
              <li>Red Onion, peeled and slice</li>
            </ul>
          </div>
          <hr className="my-6 border-dashed" />
          <div>
            <h2>Instructions</h2>
            <ol className="mt-2 list-inside list-decimal space-y-4 leading-relaxed">
              <li>
                Heat a cast-iron griddle or large heavy skillet over medium-high until very hot,
                about 2 minutes, then lightly brush with vegetable oil. Divide ground beef into 4
                equal portions (do not form patties).
              </li>
              <li>
                Working in batches if needed, place portions on griddle and smash flat with a
                spatula to form four diameter patties (craggy edges are your friend). Season
                liberally with salt and cook, undisturbed, until outer edges are brown, about 2
                minutes. Flip patties, season with salt, and place a slice of cheese on top of each
                patty. Cook until cheese droops and burgers are medium-rare, about 1 minute.
              </li>
              <li>Serve patties on rolls with ketchup, mayonnaise, lettuce, and pickles.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
