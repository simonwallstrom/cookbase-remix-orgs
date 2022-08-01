import { json, type LoaderArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Header from '~/components/Header'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await requireAuth(request),
  })
}

export default function AppLayout() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <Header />
      <Outlet />
    </div>
  )
}
