import { type ActionArgs, json, type LoaderArgs } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData } from '@remix-run/react'
import { ArrowFatLeft, ImageSquare } from 'phosphor-react'
import { z } from 'zod'
import Tiptap from '~/components/Tiptap'
import { getTagsByOrganizationId } from '~/models/tag.server'
import { requireAuth } from '~/utils/session.server'
import { getParams } from 'remix-params-helper'
import { prisma } from '~/utils/prisma.server'

export async function loader({ request }: LoaderArgs) {
  const { orgId } = await requireAuth(request)
  const tags = await getTagsByOrganizationId(orgId)

  return tags
}

const recipeSchema = z.object({
  title: z.string({ required_error: 'Title is required' }).min(1),
  content: z.string(),
  tag: z.array(z.string()),
})

export async function action({ request }: ActionArgs) {
  const { orgId } = await requireAuth(request)
  const result = getParams(await request.formData(), recipeSchema)
  if (!result.success) {
    return json(result.errors, { status: 400 })
  }

  let recipe = await prisma.recipe.create({
    data: {
      title: result.data.title,
      content: result.data.content,
      organization: {
        connect: { id: orgId },
      },
      tags: {
        connect: result.data.tag.map((id) => ({ id: id })),
      },
    },
  })

  return recipe
}

export default function NewRecipe() {
  const data = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  return (
    <div>
      <div className="flex items-center gap-4">
        <Link
          to="/recipes"
          className="flex rounded-full border border-black bg-white p-2 font-medium text-black shadow-flat hover:bg-gray-200"
        >
          <ArrowFatLeft weight="duotone" size={20} />
        </Link>
        <h1>Add recipe</h1>
      </div>
      <div className="box mt-8 overflow-hidden p-12">
        <Form method="post">
          <div className="flex flex-col items-center justify-center space-y-1.5 rounded-lg border-2 border-dashed border-black px-4 py-10">
            <ImageSquare size={48} className="text-gray-400 dark:text-gray-600" weight="light" />
            <label className="label" htmlFor="title">
              Upload image
            </label>
            <div className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</div>
          </div>

          <div className="mt-8 space-y-1.5">
            <label className="label" htmlFor="title">
              Title
            </label>
            <input
              className="w-full"
              placeholder="Smash burger..."
              type="text"
              name="title"
              id="title"
            />
            <p className="text-xs text-gray-500">Give your recipe a descriptive title.</p>
          </div>
          <div className="mt-6 space-y-1.5">
            <label className="label">Tags</label>
            <div className="space-y-1 rounded-md border border-black p-4">
              {data.map((tag) => (
                <div key={tag.id} className="flex items-center gap-2">
                  <input
                    className="text-pink-600 focus:ring-pink-600"
                    type="checkbox"
                    id={tag.id}
                    name="tag"
                    value={tag.id}
                  />
                  <label className="font-normal" htmlFor={tag.id}>
                    {tag.title} ({tag._count.recipes})
                  </label>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Choose one or multiple tags for this recipe. You can create new tags under "Settings".
            </p>
          </div>
          <div className="mt-6 space-y-1.5">
            <label className="label">Content</label>
            <div className="prose">
              <Tiptap content="<ul><li>Freshly ground beef</li><li>American cheese</li><li>Salt</li></ul>" />
            </div>
            <p className="text-xs text-gray-500">
              Add your ingredients and instructions. You can add basic formatting such as list items
              and headings.
            </p>
          </div>
          <pre>{JSON.stringify(actionData, null, 2)}</pre>
          <div className="mt-8 flex gap-8">
            <button className="rounded-md border border-black bg-yellow-300 py-2 px-4 font-medium text-black shadow-flat hover:bg-yellow-400">
              Save recipe
            </button>
            <button className="rounded-md border border-black bg-white py-2 px-4 font-medium text-black shadow-flat hover:bg-gray-200">
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </div>
  )
}
