import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ArrowLeft, DotsThreeOutline, PencilSimple } from 'phosphor-react'
import invariant from 'tiny-invariant'
import { Button, ButtonLink } from '~/components/Button'
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
      <div className="flex items-center justify-between">
        <div>
          <ButtonLink href="/recipes">
            <ArrowLeft size={16} />
            <span>Back to recipes</span>
          </ButtonLink>
        </div>
        <div className="flex items-center gap-3">
          <ButtonLink href="/recipes">
            <PencilSimple size={16} />
            <span>Edit</span>
          </ButtonLink>
          <div>
            <Button>
              <DotsThreeOutline size={20} />
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-6 overflow-hidden md:mt-12">
        {data.imgUrl ? (
          <img className="aspect-[2/1] w-full object-cover" src={data.imgUrl} alt="" />
        ) : null}
        <div>
          <h1>{data.title}</h1>
          <div className="mt-2 flex flex-col gap-3.5 border-b border-dashed pb-6 md:pb-8">
            <div className="flex items-center gap-2">
              <div>
                Simon <span className="text-gray-500">created this recipe</span> 7 days ago
              </div>
            </div>
            <div className="flex items-center gap-2">
              {data.collections.map((collection) => (
                <div className="rounded-full bg-gray-200 px-1.5 py-0.5 text-xs" key={collection.id}>
                  {collection.title}
                </div>
              ))}
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: data.content }}
            className="tiptap mt-4 max-w-xl md:mt-6"
          ></div>
        </div>
      </div>
    </div>
  )
}
