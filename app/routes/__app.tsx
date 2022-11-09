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
    <div className="flex flex-1">
      <Sidebar />
      <main className="relative flex flex-1 flex-col px-6 py-6 lg:py-10 lg:px-12 xl:py-[4.7rem]">
        <div className="mx-auto w-full max-w-3xl">
          <Outlet />
        </div>
        {/* This <div> is only here in order to preserve the height of the fixed positioned mobile nav */}
        <div className="h-16 lg:hidden"></div>
      </main>
    </div>
  )
}
