import { type ActionArgs, json, type LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'
import { ButtonLink } from '~/components/Button'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { prisma } from '~/utils/prisma.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)
  const tags = await getTagsByOrganizationId(orgId)

  return tags
}

const tagSchema = z.object({
  title: z.string(),
})

export async function action({ request }: ActionArgs) {
  const { orgId } = await requireAuth(request)
  const result = getParams(await request.formData(), tagSchema)
  if (!result.success) {
    return json(result.errors, { status: 400 })
  }

  let tags = await prisma.tag.create({
    data: {
      title: result.data.title,
      organization: {
        connect: { id: orgId },
      },
    },
  })

  return tags
}

export default function Tags() {
  const data = useLoaderData<typeof loader>()
  console.log(data)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1>Tags</h1>
        </div>
        <ButtonLink variant="secondary" href="new">
          Add tag
        </ButtonLink>
      </div>
      {data.length ? (
        <div className="box mt-8 divide-y divide-dashed p-8">
          <div className="mb-6">
            <h2>Manage tags</h2>
            <p className="mt-2">Tags let you group recipes together for easy access.</p>
          </div>
          {data.map((tag) => (
            <div className="flex justify-between py-3" key={tag.id}>
              <p>
                {tag.title}{' '}
                {tag._count.recipes > 0 ? (
                  <button className="text-link">({tag._count.recipes})</button>
                ) : (
                  <span className="text-gray-400">({tag._count.recipes})</span>
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
        <div className="box mt-8 flex flex-col items-center gap-6 px-8 py-16">
          <p className="text-base">You don't have any tags just yet.</p>
          <ButtonLink variant="primary" href="/tags/new">
            Create your first tag
          </ButtonLink>
        </div>
      )}
    </div>
  )
}
