import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getRecipesByOrganizationId } from '~/models/recipe.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url)
  const filters = url.searchParams.getAll('filter')
  console.log({ filters })
  const { orgId } = await requireAuth(request)
  return await getRecipesByOrganizationId(orgId)
}

export default function Recipes() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <div className="flex justify-between items-end">
        <h1>Recipes</h1>
        <button className="text-link">+ Add recipe</button>
      </div>
      <div className="flex items-center divide-x divide-gray-800 box p-0 mt-8">
        {/* <div className="px-5 text-xs uppercase tracking-wider text-gray-500">Filter</div> */}
        <div className="flex items-center p-2 gap-2">
          <Link
            to="?brand=nike"
            className="group flex items-center py-1.5 px-2 leading-none hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <span className="mr-1.5">Burgers</span>
            <span className="text-gray-400 dark:text-gray-500">24</span>
          </Link>
          <button className="group flex items-center py-1.5 px-2 leading-none hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="mr-1.5">Breakfast</span>
            <span className="text-gray-400 dark:text-gray-500">19</span>
          </button>
          <button className="group flex items-center py-1.5 px-2 leading-none dark:text-white dark:bg-pink-600">
            <span className="mr-1.5">Weeknight dinners</span>
            <span className="text-pink-200">8</span>
          </button>
          <button className="group flex items-center py-1.5 px-2 leading-none hover:bg-gray-100 dark:hover:bg-gray-800">
            <span className="mr-1.5">Fine-Dining</span>
            <span className="text-gray-400 dark:text-gray-500">4</span>
          </button>
        </div>
      </div>

      <div className="mt-5">
        Showing 8 of 39 recipes. <button className="text-link">Clear filter</button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-8">
        {data.map((recipe) => (
          <div key={recipe.id} className="box p-4">
            <h4>{recipe.title}</h4>
          </div>
        ))}
      </div>
    </div>
  )
}
