import { json, type LoaderArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Sidebar from '~/components/Sidebar'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await requireAuth(request),
  })
}
export default function AppLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}
