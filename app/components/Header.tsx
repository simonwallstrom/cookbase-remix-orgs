import { NavLink } from '@remix-run/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-black bg-white px-4 md:px-6">
      <div className="mx-auto flex w-full max-w-2xl justify-start gap-10">
        <CustomNavLink label="Recipes" to="/recipes" />
        <CustomNavLink label="Tags" to="/tags" />
        <CustomNavLink label="Settings" to="/settings" />
      </div>
    </header>
  )
}

function CustomNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        'relative -mb-0.5 py-5 text-center font-medium hover:text-pink-600 ' +
        (isActive ? 'text-pink-600' : undefined)
      }
      to={to}
    >
      {label}
    </NavLink>
  )
}
