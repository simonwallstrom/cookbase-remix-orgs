import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import * as React from 'react'
import { getUserId, createUserSession } from '~/utils/session.server'
import { createUser, getUserByEmail } from '~/models/user.server'
import { z } from 'zod'
import { validateAction } from '~/utils/utils'
import { Button } from '~/components/Button'

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect('/recipes')
  return json({})
}

const joinSchema = z.object({
  account: z
    .string({ required_error: 'Account name is required' })
    .min(1)
    .max(50, 'Account name can not be longer than 50 characters'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  password: z.string().min(6, 'Password must be atleast 6 characters long'),
  redirectTo: z.string().default('/recipes'),
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
    <>
      {/* Logo and heading */}
      <div className="space-y-8">
        <div>
          <Link className="mx-auto flex justify-center" to="/">
            <svg
              className="block h-8 text-black"
              viewBox="0 0 366 71"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M99 36.2868C99 29.0011 101.086 23.3038 105.259 19.195C109.452 15.065 114.546 13 120.54 13C125.474 13 129.583 14.2072 132.866 16.6217C136.149 19.015 138.33 22.4037 139.41 26.7878L131.786 28.7575C129.774 23.4627 126.025 20.8152 120.54 20.8152C116.791 20.8152 113.688 22.1389 111.231 24.7864C108.817 27.455 107.609 31.2885 107.609 36.2868C107.609 41.3064 108.817 45.1504 111.231 47.819C113.688 50.4665 116.791 51.7902 120.54 51.7902C126.025 51.7902 129.774 49.1428 131.786 43.8479L139.41 45.7858C138.33 50.17 136.149 53.5693 132.866 55.9837C129.583 58.377 125.474 59.5736 120.54 59.5736C114.525 59.5736 109.431 57.5192 105.259 53.4104C101.086 49.3016 99 43.5937 99 36.2868Z" />
              <path d="M140.986 42.6724C140.986 37.6953 142.511 33.6288 145.561 30.4731C148.632 27.3173 152.656 25.7394 157.633 25.7394C162.716 25.7394 166.772 27.3491 169.801 30.5684C172.808 33.7665 174.312 37.8012 174.312 42.6724C174.312 47.5861 172.808 51.6419 169.801 54.84C166.836 57.9958 162.78 59.5736 157.633 59.5736C152.487 59.5736 148.431 57.9958 145.466 54.84C142.479 51.6631 140.986 47.6072 140.986 42.6724ZM149.437 42.6724C149.437 45.4681 150.167 47.8402 151.629 49.7887C153.111 51.7161 155.113 52.6797 157.633 52.6797C160.175 52.6797 162.176 51.7161 163.638 49.7887C165.099 47.8614 165.83 45.4893 165.83 42.6724C165.83 39.8767 165.088 37.5152 163.606 35.5879C162.144 33.6394 160.154 32.6651 157.633 32.6651C155.134 32.6651 153.143 33.6394 151.661 35.5879C150.178 37.5364 149.437 39.8979 149.437 42.6724Z" />
              <path d="M176.619 42.6724C176.619 37.6953 178.143 33.6288 181.193 30.4731C184.264 27.3173 188.288 25.7394 193.266 25.7394C198.349 25.7394 202.405 27.3491 205.433 30.5684C208.441 33.7665 209.944 37.8012 209.944 42.6724C209.944 47.5861 208.441 51.6419 205.433 54.84C202.468 57.9958 198.412 59.5736 193.266 59.5736C188.119 59.5736 184.063 57.9958 181.098 54.84C178.112 51.6631 176.619 47.6072 176.619 42.6724ZM185.069 42.6724C185.069 45.4681 185.8 47.8402 187.261 49.7887C188.744 51.7161 190.745 52.6797 193.266 52.6797C195.807 52.6797 197.809 51.7161 199.27 49.7887C200.731 47.8614 201.462 45.4893 201.462 42.6724C201.462 39.8767 200.721 37.5152 199.238 35.5879C197.777 33.6394 195.786 32.6651 193.266 32.6651C190.766 32.6651 188.776 33.6394 187.293 35.5879C185.81 37.5364 185.069 39.8979 185.069 42.6724Z" />
              <path d="M213.31 59.0653V13H221.379V39.146L232.054 26.2795H241.997L228.845 41.3699L242.855 59.0653H232.943L221.379 43.5937V59.0653H213.31Z" />
              <path d="M245.003 59.0653V13H253.072V29.2658C253.856 28.2916 254.989 27.4656 256.471 26.7878C257.954 26.0889 259.468 25.7394 261.014 25.7394C265.78 25.7394 269.465 27.2538 272.07 30.2824C274.675 33.2899 275.978 37.4199 275.978 42.6724C275.978 47.9038 274.675 52.0338 272.07 55.0624C269.465 58.0699 265.78 59.5736 261.014 59.5736C259.257 59.5736 257.636 59.1818 256.154 58.3982C254.671 57.6145 253.644 56.7144 253.072 55.6978V59.0653H245.003ZM252.341 42.6724C252.341 45.5952 252.987 47.9991 254.279 49.884C255.592 51.7478 257.467 52.6797 259.903 52.6797C262.317 52.6797 264.181 51.7372 265.494 49.8523C266.828 47.9461 267.495 45.5528 267.495 42.6724C267.495 39.792 266.839 37.4093 265.526 35.5244C264.213 33.6182 262.338 32.6651 259.903 32.6651C257.467 32.6651 255.592 33.6076 254.279 35.4926C252.987 37.3776 252.341 39.7708 252.341 42.6724Z" />
              <path d="M277.966 49.6299C277.966 46.3894 279.248 43.7949 281.811 41.8464C284.394 39.8767 287.773 38.8919 291.945 38.8919H297.409V37.4623C297.409 34.2642 295.503 32.6651 291.691 32.6651C288.768 32.6651 286.883 33.9147 286.036 36.4139L279.205 34.8572C279.735 32.1039 281.133 29.9012 283.399 28.2492C285.665 26.576 288.429 25.7394 291.691 25.7394C300.883 25.7394 305.479 30.3248 305.479 39.4955V59.0653H298.839L298.013 54.9036C295.471 58.0169 292.104 59.5736 287.91 59.5736C284.945 59.5736 282.541 58.6947 280.699 56.9368C278.877 55.1577 277.966 52.7221 277.966 49.6299ZM286.417 49.5028C286.417 50.4135 286.724 51.176 287.338 51.7902C287.953 52.3832 288.779 52.6797 289.816 52.6797C291.85 52.6797 293.618 52.0338 295.122 50.7418C296.647 49.4499 297.409 47.8402 297.409 45.9129V45.2775H292.008C288.281 45.2775 286.417 46.6859 286.417 49.5028Z" />
              <path d="M308.007 50.7418L314.425 47.279C315.738 50.8795 317.93 52.6797 321.001 52.6797C323.691 52.6797 325.036 51.5149 325.036 49.1851C325.036 48.0626 324.453 47.2366 323.288 46.7071C322.717 46.3894 322.113 46.1247 321.478 45.9129C321.075 45.7223 320.281 45.4258 319.095 45.0233C317.93 44.5998 317.178 44.3138 316.839 44.1656C314.637 43.2337 312.974 42.0794 311.852 40.7027C310.75 39.3261 310.2 37.5258 310.2 35.302C310.2 32.6969 311.184 30.4413 313.154 28.5351C315.081 26.6713 317.591 25.7394 320.683 25.7394C322.822 25.7394 324.803 26.2266 326.624 27.2008C328.467 28.1751 329.918 29.467 330.977 31.0767L326.148 35.5244C324.623 33.6182 322.801 32.6651 320.683 32.6651C319.836 32.6651 319.127 32.9087 318.555 33.3958C317.983 33.883 317.697 34.5501 317.697 35.3973C317.697 36.7316 318.735 37.7906 320.81 38.5742C322.251 39.1037 323.966 39.7073 325.957 40.385C326.55 40.618 327.397 41.0734 328.499 41.7511C329.621 42.4077 330.331 42.9266 330.627 43.3078C331.983 44.8327 332.66 46.6118 332.66 48.645C332.66 51.6525 331.58 54.2364 329.42 56.3967C327.302 58.5147 324.496 59.5736 321.001 59.5736C317.994 59.5736 315.336 58.7159 313.027 57.0003C310.718 55.2848 309.045 53.1986 308.007 50.7418Z" />
              <path d="M335.412 47.4378C335.052 45.8705 334.871 44.2821 334.871 42.6724C334.871 41.0628 335.052 39.4743 335.412 37.907C335.772 36.3398 336.365 34.8148 337.191 33.3323C338.017 31.8497 339.023 30.5578 340.209 29.4564C341.395 28.3339 342.888 27.4338 344.688 26.7561C346.488 26.0783 348.469 25.7394 350.629 25.7394C353.171 25.7394 355.458 26.2266 357.491 27.2008C359.546 28.1751 361.176 29.5094 362.384 31.2037C364.735 34.3807 365.91 37.96 365.91 41.9417V45.2775H343.322C343.428 47.3531 344.18 49.111 345.578 50.5512C346.997 51.9702 348.829 52.6797 351.074 52.6797C354.42 52.6797 357.068 50.996 359.016 47.6284L365.529 50.0111C362.733 56.3861 357.766 59.5736 350.629 59.5736C348.469 59.5736 346.488 59.2348 344.688 58.557C342.888 57.8793 341.395 56.9897 340.209 55.8884C339.023 54.7659 338.017 53.474 337.191 52.0126C336.365 50.53 335.772 49.0051 335.412 47.4378ZM343.513 38.8919H357.65C356.739 34.7407 354.399 32.6651 350.629 32.6651C348.765 32.6651 347.187 33.2582 345.895 34.4442C344.603 35.6303 343.809 37.1128 343.513 38.8919Z" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31 12C20.5066 12 12 20.5066 12 31V39C12 49.4934 20.5066 58 31 58H39C49.4934 58 58 49.4934 58 39V31C58 20.5066 49.4934 12 39 12H31ZM36.5788 50.5021C35.7516 50.4585 35.0456 51.0939 35.0021 51.9212C34.9585 52.7484 35.5939 53.4544 36.4212 53.4979C41.5386 53.7673 45.9717 52.1496 49.0607 49.0607C52.1496 45.9717 53.7673 41.5386 53.4979 36.4212C53.4544 35.5939 52.7484 34.9585 51.9212 35.0021C51.0939 35.0456 50.4585 35.7516 50.5021 36.5788C50.7327 40.9614 49.3504 44.5283 46.9393 46.9393C44.5283 49.3504 40.9614 50.7327 36.5788 50.5021Z"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30C0 13.4315 13.4315 0 30 0H40C56.5685 0 70 13.4315 70 30V40C70 56.5685 56.5685 70 40 70H30C13.4315 70 0 56.5685 0 40V30ZM8 31C8 18.2975 18.2975 8 31 8H39C51.7025 8 62 18.2975 62 31V39C62 51.7025 51.7025 62 39 62H31C18.2975 62 8 51.7025 8 39V31Z"
              />
            </svg>
          </Link>
        </div>
        <h2 className="text-xl font-normal leading-normal text-gray-900">
          Welcome to Cookbase. Create an account to get started.
        </h2>
      </div>
      <Form method="post" className="mt-8 space-y-4">
        {/* Account name */}
        <div>
          <label htmlFor="account" className="sr-only">
            Account name
          </label>
          <input
            ref={accountRef}
            id="account"
            required
            name="account"
            placeholder="Account name..."
            type="text"
            autoFocus={true}
            autoComplete="account"
            aria-invalid={actionData?.errors?.account ? true : undefined}
            aria-describedby="account-error"
            className="input !px-4 !py-3"
          />
          {actionData?.errors?.account && (
            <div className="pt-1 text-red-700" id="account-error">
              {actionData.errors.account}
            </div>
          )}
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            ref={emailRef}
            id="email"
            required
            placeholder="Email addres..."
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
            className="input !px-4 !py-3"
          />
          {actionData?.errors?.email && (
            <div className="pt-1 text-red-700" id="email-error">
              {actionData.errors.email}
            </div>
          )}
        </div>

        {/* Password input */}
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            ref={passwordRef}
            name="password"
            placeholder="Password..."
            type="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
            className="input !px-4 !py-3"
          />
          {actionData?.errors?.password && (
            <div className="pt-1 text-red-700" id="password-error">
              {actionData.errors.password}
            </div>
          )}
        </div>

        <div>
          <Button size="lg" variant="primary" className="w-full" type="submit">
            Create account
          </Button>
        </div>
      </Form>
    </>
  )
}
