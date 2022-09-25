import { type ActionArgs, json, type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'
import { ButtonLink } from '~/components/Button'
import { getCollectionsByOrganizationId } from '~/models/collection.server'
import { prisma } from '~/utils/prisma.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)
  const collections = await getCollectionsByOrganizationId(orgId)

  return collections
}

const collectionSchema = z.object({
  title: z.string(),
})

export async function action({ request }: ActionArgs) {
  const { orgId } = await requireAuth(request)
  const result = getParams(await request.formData(), collectionSchema)
  if (!result.success) {
    return json(result.errors, { status: 400 })
  }

  let tags = await prisma.collection.create({
    data: {
      title: result.data.title,
      emoji: '🥕',
      organization: {
        connect: { id: orgId },
      },
    },
  })

  return tags
}

export default function Collections() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Collections</h1>
        </div>
        <ButtonLink variant="secondary" href="new">
          Add collection
        </ButtonLink>
      </div>
      {data.length ? (
        <div className="mt-8 divide-y divide-gray-100">
          {data.map((collection) => (
            <div className="flex justify-between py-3" key={collection.id}>
              <p>
                {collection.title}{' '}
                {collection._count.recipes > 0 ? (
                  <button className="text-link">({collection._count.recipes})</button>
                ) : (
                  <span className="text-gray-400">({collection._count.recipes})</span>
                )}
              </p>
              <div className="flex gap-4">
                <button className="text-link">Edit</button>
                <button className="text-link">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 flex flex-col items-center gap-6 px-8 py-16">
          <p className="text-base">You don't have any collections just yet.</p>
          <ButtonLink variant="primary" href="new">
            Create your first collection
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
