import type { LoaderArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getOrganizationById, getOrganizationMembersById } from '~/models/organization.server'
import { getUserById } from '~/models/user.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { userId, orgId } = await requireAuth(request)
  const user = await getUserById(userId)
  const members = await getOrganizationMembersById(orgId)
  const organization = await getOrganizationById(orgId)

  return { user, members, organization }
}

export default function Settings() {
  const data = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Settings</h1>
      <p className="mt-2">Manage your user and family account settings.</p>
      <div className="box px-8 py-7 mt-8">
        <h2>User settings</h2>
        <Form action="/logout" method="post">
          <div className="mt-2 flex justify-between">
            <span>
              Logged in as{' '}
              <strong className="text-black dark:text-white">{data.user?.email}</strong>
            </span>
            <button type="submit" className="text-link">
              Logout
            </button>
          </div>
        </Form>
      </div>
      <div className="box px-8 py-7 mt-8">
        <h2>Account settings</h2>
        <div className="mt-2 flex justify-between">
          <div>
            Account name:{' '}
            <strong className="text-black dark:text-white">{data.user?.organization.name}</strong>
          </div>
          <div>
            <button className="text-link">Edit account name</button>
          </div>
        </div>
        <hr className="my-6" />
        <div>
          <h3>Members</h3>
          <ol className="mt-2 list-disc list-inside">
            {data.members.map((member) => (
              <li key={member.email}>
                {member.email}
                {member.email == data.user?.email ? <span>(You)</span> : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6">
          <h4>Invite link</h4>
          <label htmlFor="invite_link" className="mt-2 block">
            Share this link to allow others to join your account:
          </label>
          <div className="mt-2">
            <input
              type="text"
              disabled={true}
              defaultValue={`cookbase.fly.dev/invite/${data.organization?.invite[0].id}`}
              name="invite_link"
              id="invite_link"
              className="w-full"
            />
            <p className="text-xs mt-2 text-gray-500">
              Anyone with the link can join your account, make sure to keep it safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}