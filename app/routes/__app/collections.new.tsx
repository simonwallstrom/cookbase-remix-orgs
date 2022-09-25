import { type ActionArgs, json, type LoaderArgs, redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { ArrowFatLeft } from 'phosphor-react'
import { getParams } from 'remix-params-helper'
import { z } from 'zod'
import { Button, ButtonLink } from '~/components/Button'
import { prisma } from '~/utils/prisma.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)

  if (!orgId) return redirect('/login')
  return {}
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

  await prisma.tag.create({
    data: {
      title: result.data.title,
      organizationId: orgId,
    },
  })

  return redirect('/tags')
}

export default function NewTag() {
  return (
    <div>
      <div className="flex">
        <ButtonLink href="/tags">
          <ArrowFatLeft weight="duotone" size={20} />
          <span>Back to app</span>
        </ButtonLink>
      </div>
      <div className="mt-8 overflow-hidden p-8">
        <Form method="post">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="input w-full"
              placeholder="Smash burger..."
              type="text"
              name="title"
              id="title"
            />
            <p className="text-xs text-gray-500">Give your tag a descriptive title.</p>
          </div>

          {/* Submit button */}
          <div className="mt-6 flex gap-8">
            <Button variant="primary" type="submit">
              Create tag
            </Button>
            <ButtonLink href="/tags">Cancel</ButtonLink>
          </div>
        </Form>
      </div>
    </div>
  )
}
