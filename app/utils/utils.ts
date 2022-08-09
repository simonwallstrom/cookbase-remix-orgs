import type { ZodError, ZodSchema } from 'zod'

type ActionErrors<T> = Partial<Record<keyof T, string>>

export async function validateAction<ActionInput>({
  request,
  schema,
}: {
  request: Request
  schema: ZodSchema
}) {
  const body = Object.fromEntries(await request.formData())

  console.log(body)

  try {
    const formData = schema.parse(body) as ActionInput
    return { formData, errors: null }
  } catch (e) {
    const errors = e as ZodError<ActionInput>

    const zodErrors = errors.issues.reduce((acc: ActionErrors<ActionInput>, curr) => {
      const key = curr.path[0] as keyof ActionInput
      acc[key] = curr.message

      return acc
    }, {})

    return { FormData: body, errors: zodErrors }
  }
}
