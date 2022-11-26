import type { LoaderArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, useSearchParams, useSubmit } from '@remix-run/react'
import { Hash, ImageSquare, Sliders } from 'phosphor-react'
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
    <>
      <aside className="sticky top-0 h-screen w-80 border-r py-4">
        <div className="flex items-center justify-between border-b px-4 pb-4">
          <div className="mx-0.5 px-1.5 font-semibold">All recipes</div>
          <button className="mx-0.5  rounded-md p-1.5 hover:bg-gray-200">
            <Sliders weight="duotone" size={16} />
          </button>
        </div>
        <div className="divide-y border-b">
          <div className="py-4 px-6">
            <div className="text-gray-900">Lasagne med soltorkade tomater och spenat</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <div className="text-xs text-gray-500">Italian dishes</div>
              <div>·</div>
              <div className="text-xs text-gray-500">Created 6 days ago</div>
            </div>
          </div>
          <div className="py-4 px-6">
            <div className="text-gray-900">Triple Smash Burger med karamelliserad lök</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Hash />
                <span>Healthy,</span>
                <span>American</span>
              </div>
              <div>·</div>
              <div className="text-xs text-gray-500">Created 8 days ago</div>
            </div>
          </div>
        </div>
      </aside>
      <div>
        <div className="flex items-end justify-between border-b pb-8">
          <h1>Recipes ({totalCount})</h1>
          <Link
            to="new"
            className="rounded-md border border-black bg-yellow-300 py-2 px-4 font-medium text-black shadow-flat hover:bg-yellow-400"
          >
            + Add recipe
          </Link>
        </div>

        {/* Tag filter */}
        {tags.length ? (
          <Form className="mt-8 flex items-center gap-4" method="get">
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
        <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-2">
          {recipes.length ? (
            <>
              {recipes.map((recipe) => (
                <Link
                  to={recipe.id}
                  key={recipe.id}
                  className="box group overflow-hidden transition-colors hover:bg-gray-50"
                >
                  {recipe.imgUrl ? (
                    <img
                      className="aspect-[2/1] border-b border-black object-cover"
                      src={recipe.imgUrl}
                      alt=""
                    />
                  ) : (
                    <div className="flex aspect-[2/1] items-center justify-center border-b border-black bg-gray-200">
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
    </>
  )
}
