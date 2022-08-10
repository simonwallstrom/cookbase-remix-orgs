import type { LoaderArgs } from '@remix-run/node'
import { requireAuth } from '~/utils/session.server'

export async function loader({ request }: LoaderArgs) {
  await requireAuth(request)
  return {}
}

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl">Dashboard</h1>
      <div className="box mt-8 p-8">
        <h2>A useful dashboard...</h2>
        <p className="mt-2">Is coming soon. In the meantime you can manage your recipes.</p>
      </div>
    </div>
  )
}
