import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import * as React from 'react'
import { getUserId, createUserSession } from '~/utils/session.server'
import { createUser, getUserByEmail } from '~/models/user.server'
import { z } from 'zod'
import { validateAction } from '~/utils/utils'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect('/dashboard')
  return json({})
}

const joinSchema = z.object({
  account: z
    .string({ required_error: 'Account name is required' })
    .min(1)
    .max(50, 'Account name can not be longer than 50 characters'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string().min(6, 'Password must be atleast 6 characters long'),
  redirectTo: z.string().default('/dashboard'),
})

type ActionInput = z.infer<typeof joinSchema>

export async function action({ request }: ActionArgs) {
  const { formData, errors } = await validateAction<ActionInput>({
    request,
    schema: joinSchema,
  })

  if (errors) {
    return json({ errors }, { status: 400 })
  }

  const { account, email, password, redirectTo } = formData

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json(
      {
        errors: {
          account: null,
          email: 'A user already exists with this email',
          password: null,
        },
      },
      { status: 400 }
    )
  }

  const user = await createUser(account, email, password)

  return createUserSession({
    request,
    userId: user.id,
    orgId: user.organizationId,
    redirectTo,
  })
}

export default function SignUp() {
  const actionData = useActionData<typeof action>()
  const accountRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.account) {
      accountRef.current?.focus()
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <Form method="post" className="space-y-6">
      <div>
        <label htmlFor="account" className="">
          Account name
        </label>
        <div className="mt-1">
          <input
            ref={accountRef}
            id="account"
            required
            name="account"
            type="text"
            autoFocus={true}
            autoComplete="account"
            aria-invalid={actionData?.errors?.account ? true : undefined}
            aria-describedby="account-error"
            className="w-full text-sm"
          />
          {actionData?.errors?.account && (
            <div className="pt-1 text-red-700" id="account-error">
              {actionData.errors.account}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="">
          Email address
        </label>
        <div className="mt-1">
          <input
            ref={emailRef}
            id="email"
            required
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
            className="w-full text-sm"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="password" className="">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            ref={passwordRef}
            name="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
            className="w-full text-sm"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="w-full border border-black bg-blue-500 py-2 px-4 font-medium text-white outline-none hover:bg-blue-600 focus-visible:border-blue-600 focus-visible:ring-1 focus-visible:ring-blue-600"
      >
        Create Account
      </button>
      <div className="flex items-center justify-center">
        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link className="text-blue-500 underline" to="/login">
            Log in
          </Link>
        </div>
      </div>
    </Form>
  )
}
