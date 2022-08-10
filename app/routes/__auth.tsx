import { Outlet } from '@remix-run/react'

export default function AuthLayout() {
  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-xs text-center">
        <Outlet />
      </div>
    </div>
  )
}
