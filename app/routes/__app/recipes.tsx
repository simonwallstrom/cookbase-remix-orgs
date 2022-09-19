import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ArrowRight, ImageSquare } from 'phosphor-react'
import { ButtonLink } from '~/components/Button'
import { getRecipes } from '~/models/recipe.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)
  const recipes = await getRecipes(orgId)

  return { recipes }
}

export default function Recipes() {
  const { recipes } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>All recipes</h1>
      <p className="mt-1">This is a list of all your recipes in alphabetic order.</p>

      <div className="mt-10 grid grid-cols-1 divide-y divide-gray-100 border-y border-gray-100">
        {recipes.length ? (
          <>
            {recipes.map((recipe) => (
              <Link
                to={recipe.id}
                key={recipe.id}
                className="group relative flex items-center gap-5 py-5"
              >
                <span className="absolute -inset-x-5 -inset-y-px -z-10 rounded-2xl transition-colors group-hover:bg-gray-100"></span>
                {recipe.imgUrl ? (
                  <img className="h-16 w-16 rounded-xl object-cover" src={recipe.imgUrl} alt="" />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                    <ImageSquare size={20} className="text-gray-500" weight="duotone" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="line-clamp-1">{recipe.title}</h4>
                  <div className="flex gap-4">
                    {recipe.tags.map((tag) => (
                      <div className="mt-1 text-xs text-gray-500" key={tag.id}>
                        {tag.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="transition-transform group-hover:-translate-x-1">
                  <ArrowRight />
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="flex flex-col items-center gap-6 px-8 py-16">
            <p className="text-base">You don't have any recipes just yet.</p>
            <ButtonLink variant="primary" href="/recipes/new">
              Create your first recipe →
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  )
}
