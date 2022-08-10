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
      <div className="px-4 pt-6 pb-36 md:px-6 md:pt-8">
        <div className="mx-auto w-full max-w-2xl">
          <Outlet />
        </div>
      </div>
    </>
  )
}
