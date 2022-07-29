import type { LoaderArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getRecipesByOrganizationId } from '~/models/recipe.server'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const filters = url.searchParams.getAll('tag')
  console.log({ filters })

  const { orgId } = await requireAuth(request)
  const recipes = await getRecipesByOrganizationId(orgId)
  const tags = await getTagsByOrganizationId(orgId)

  return { recipes, tags }
}

export default function Recipes() {
  const { recipes, tags } = useLoaderData<typeof loader>()
  return (
    <div>
      <div className="flex justify-between items-end">
        <h1>Recipes</h1>
        <button className="text-link">+ Add recipe</button>
      </div>
      <Form
        className="flex mt-8 bg-gray-800 border border-gray-700 shadow-flat p-4 gap-4"
        method="get"
      >
        {tags.map((tag) => (
          <div key={tag.id} className="flex gap-2 items-center">
            <input type="checkbox" id={tag.title} name="tag" value={tag.title} />
            <label htmlFor={tag.title}>{tag.title} (24)</label>
          </div>
        ))}
        <button type="submit">Update</button>
      </Form>

      <div className="mt-6 text-gray-500">
        Showing 8 of 39 recipes. <button className="text-link">Clear filter</button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="box p-4">
            <h4>{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
