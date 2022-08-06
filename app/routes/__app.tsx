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
    <>
      <Header />
      <div className="px-8 pt-8 pb-36">
        <div className="mx-auto w-full max-w-3xl">
          <Outlet />
        </div>
      </div>
    </>
  )
}
