import type { LoaderArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { getInvitations } from '~/models/invitation.server'
import { getOrganizationById, getOrganizationMembersById } from '~/models/organization.server'
import { getUserById } from '~/models/user.server'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  const { userId, orgId } = await requireAuth(request)
  const user = await getUserById(userId)
  const members = await getOrganizationMembersById(orgId)
  const organization = await getOrganizationById(orgId)
  const invitation = await getInvitations(orgId)

  return { user, members, organization, invitation }
}

export default function Settings() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Settings</h1>
      <p className="mt-2">Manage your user and family account settings.</p>

      <hr className="my-10" />

      {/* User settings */}
      <div>
        <h2>User settings</h2>
        <Form action="/logout" method="post">
          <div className="mt-2 flex justify-between">
            <span>
              Logged in as <strong className="text-black">{data.user?.email}</strong>
            </span>
            <button type="submit" className="text-link">
              Logout
            </button>
          </div>
        </Form>
      </div>

      <hr className="my-10" />

      {/* Account settings */}
      <div>
        <h2>Account settings</h2>
        <div className="mt-2 flex justify-between">
          <div>
            Account name: <strong className="text-black">{data.user?.organization.name}</strong>
          </div>
          <div>
            <button className="text-link">Edit account name</button>
          </div>
        </div>
        <div className="mt-8 rounded-xl bg-gray-50 px-8 py-7">
          <h3>Members</h3>
          <ol className="mt-3">
            {data.members?.map((member) => (
              <li key={member.email}>
                {member.email}
                {member.email == data.user?.email ? <span>(You)</span> : null}
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-6">
          <label htmlFor="invite_link" className="label mt-1.5 block">
            Invite link
          </label>
          <div className="mt-1.5">
            <input
              type="text"
              disabled={true}
              value={`cookbase.fly.dev/invite/${data.invitation?.id}`}
              name="invite_link"
              id="invite_link"
              className="input w-full"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Share this link to allow others to join your account. Anyone with the link can join
              your account so make sure to keep it safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
