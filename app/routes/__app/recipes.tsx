import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import Pagination from '~/components/Pagination'
import { getRecipeCount, getRecipes } from '~/models/recipe.server'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)

  const url = new URL(request.url)
  const tagFilter = url.searchParams.getAll('tag')
  const pageFilter = url.searchParams.get('page')

  const page = pageFilter ? parseInt(pageFilter) : undefined

  const recipes = await getRecipes(orgId, tagFilter, page)
  const { totalCount, filteredCount } = await getRecipeCount(orgId, tagFilter)
  const tags = await getTagsByOrganizationId(orgId)

  return { recipes, totalCount, filteredCount, tags }
}

export default function Recipes() {
  const { recipes, totalCount, filteredCount, tags } = useLoaderData<typeof loader>()
  const submit = useSubmit()
  const [searchParams] = useSearchParams()
  const tagParams = searchParams.getAll('tag')
  const pageParams = searchParams.get('page')
  const currentPage = pageParams ? parseInt(pageParams) : 1

  return (
    <div>
      <div className="flex items-end justify-between">
        <h1>Recipes ({totalCount})</h1>
        <Link
          to="new"
          className="rounded-md border border-black bg-yellow-300 py-2 px-4 font-medium text-black shadow-flat hover:bg-yellow-400"
        >
          + Add recipe
        </Link>
      </div>

      <Form className="box mt-8 flex items-center gap-4 p-4" method="get">
        {tags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2">
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
              {tag.title} ({tag._count.recipes})
            </label>
          </div>
        ))}
      </Form>

      <div className="mt-8 grid grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Link
            to={recipe.id}
            key={recipe.id}
            className="box group overflow-hidden transition-colors hover:bg-gray-100"
          >
            {recipe.imgUrl ? (
              <img
                className="aspect-[2/1] border-b border-black object-cover transition-opacity group-hover:opacity-80"
                src={recipe.imgUrl}
                alt=""
              />
            ) : null}
            <div className="px-4 py-3">
              <h4>{recipe.title}</h4>
              <div className="flex">
                {recipe.tags.map((tag) => (
                  <div className="mt-1 rounded text-xs text-gray-600" key={tag.id}>
                    {tag.title}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Pagination totalCount={filteredCount} currentPage={currentPage} />
    </div>
  )
}
