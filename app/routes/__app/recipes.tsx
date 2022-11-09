import type { LoaderArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { ButtonLink } from '~/components/Button'
import { requireAuth } from '~/utils/session.server'
import { ArrowRight, ImageSquare } from 'phosphor-react'
import { prisma } from '~/utils/prisma.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)

  const recipes = await prisma.recipe.findMany({
    where: {
      organizationId: orgId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: { collections: true },
  })

  const recipesCount = await prisma.recipe.count({
    where: {
      organizationId: orgId,
    },
  })

  return { recipes, recipesCount }
}

export default function Recipes() {
  const { recipes, recipesCount } = useLoaderData<typeof loader>()

  return (
    <>
      <h1>Recipes</h1>
      <p className="mt-2">You have {recipesCount} recipes in your account.</p>

      <div className="mt-6 divide-y divide-gray-100 border-y border-gray-100 md:mt-10">
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
                    <ImageSquare className="text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="leading-tight line-clamp-2">{recipe.title}</h4>
                  <div className="flex gap-4">
                    {recipe.collections.map((collection) => (
                      <div className="mt-1 text-xs text-gray-500" key={collection.id}>
                        {collection.title}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="transition-transform group-hover:-translate-x-1">
                  <ArrowRight className="w-4" />
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
    </>
  )
}
