import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { ImageSquare } from 'phosphor-react'
import { ButtonLink } from '~/components/Button'
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
          className="rounded-md border border-black bg-yellow-300 py-2 px-4 font-medium text-black hover:bg-yellow-400"
        >
          + Add recipe
        </Link>
      </div>

      {/* Tag filter */}
      {tags.length ? (
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
      ) : null}

      {/* Recipe grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
        {recipes.length ? (
          <>
            {recipes.map((recipe) => (
              <Link
                to={recipe.id}
                key={recipe.id}
                className="box group overflow-hidden transition-all hover:border-gray-300 hover:shadow"
              >
                {recipe.imgUrl ? (
                  <img className="aspect-[2/1] border-b object-cover" src={recipe.imgUrl} alt="" />
                ) : (
                  <div className="flex aspect-[2/1] items-center justify-center border-b bg-gray-50">
                    <ImageSquare size={36} className="text-gray-500" weight="duotone" />
                  </div>
                )}
                <div className="px-4 py-3">
                  <h4 className="line-clamp-1">{recipe.title}</h4>
                  <div className="flex gap-2">
                    {recipe.tags.map((tag) => (
                      <div className="mt-0.5 rounded text-xs text-gray-600" key={tag.id}>
                        {tag.title}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="box col-span-2 flex flex-col items-center gap-6 px-8 py-16">
            <p className="text-base">You don't have any recipes just yet.</p>
            <ButtonLink variant="primary" href="/recipes/new">
              Create your first recipe →
            </ButtonLink>
          </div>
        )}
      </div>

      <Pagination totalCount={filteredCount} currentPage={currentPage} />
    </div>
  )
}
