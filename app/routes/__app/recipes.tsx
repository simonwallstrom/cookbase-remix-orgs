import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { getRecipeCount, getRecipesByOrganizationId } from '~/models/recipe.server'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const tagFilter = url.searchParams.getAll('tag')

  const { orgId } = await requireAuth(request)
  const recipes = await getRecipesByOrganizationId(orgId, tagFilter)
  const recipeCount = await getRecipeCount(orgId)
  const tags = await getTagsByOrganizationId(orgId)

  return { recipes, recipeCount, tags }
}

export default function Recipes() {
  const { recipes, recipeCount, tags } = useLoaderData<typeof loader>()
  const submit = useSubmit()
  const [searchParams] = useSearchParams()
  const tagParams = searchParams.getAll('tag')

  return (
    <div>
      <div className="flex justify-between items-end">
        <h1>Recipes</h1>
        <button className="bg-yellow-400 border text-black font-medium border-black shadow-flat py-2 px-4">
          + Add recipe
        </button>
      </div>
      <Form
        className="flex mt-8 dark:bg-gray-800 bg-white border border-gray-700 shadow-flat p-4 gap-4"
        method="get"
      >
        {tags.map((tag) => (
          <div key={tag.id} className="flex gap-2 items-center">
            <input
              checked={tagParams.includes(tag.title)}
              onChange={(e) => submit(e.currentTarget.form)}
              className="text-pink-600 focus:ring-pink-600"
              type="checkbox"
              id={tag.title}
              name="tag"
              value={tag.title}
            />
            <label htmlFor={tag.title}>
              {tag.title} ({tag._count.recipe})
            </label>
          </div>
        ))}
      </Form>

      <div className="mt-6 text-gray-500">
        Showing 8 of {recipeCount} recipes.{' '}
        <Link to="/recipes" className="text-link">
          Clear filter
        </Link>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="box p-4">
            <h4>{recipe.title}</h4>
            <div>
              {recipe.tag.map((tag) => (
                <div className="text-xs text-gray-500 mt-1" key={tag.id}>
                  {tag.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
