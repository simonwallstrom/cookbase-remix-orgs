import type { LoaderArgs } from '@remix-run/node'
import { Form, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { z } from 'zod'
import Pagination from '~/components/Pagination'
import { getRecipeCount, getRecipesByOrganizationId } from '~/models/recipe.server'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)

  const url = new URL(request.url)
  const tagFilter = url.searchParams.getAll('tag')
  const pageFilter = url.searchParams.get('page')
  const page = pageFilter ? parseInt(pageFilter) : undefined
  const pageSchema = z.number().nonnegative()
  const parsedPage = pageSchema.parse(page)

  const recipes = await getRecipesByOrganizationId(orgId, tagFilter, parsedPage)
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
      <div className="flex justify-between items-end">
        <h1>Recipes ({totalCount})</h1>
        <button className="bg-yellow-300 hover:bg-yellow-400 border rounded-md text-black font-medium border-black shadow-flat py-2 px-4">
          + Add recipe
        </button>
      </div>

      <Form className="flex box mt-8 p-4 gap-4 items-center" method="get">
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

      {/* <div className="h-14 flex items-center">
        {tagParams.length ? (
          <div className="text-gray-500">
            {filteredCount} of {totalCount} recipes matched your filter.{' '}
            <Link to="/recipes" className="text-link">
              Clear filter
            </Link>
          </div>
        ) : null}
      </div> */}

      <div className="grid mt-8 grid-cols-3 gap-8">
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

      <Pagination totalCount={filteredCount} currentPage={currentPage} />
    </div>
  )
}
