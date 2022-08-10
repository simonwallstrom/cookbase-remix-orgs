import { NavLink } from '@remix-run/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b-2 border-black bg-white md:px-6">
      <div className="mx-auto flex w-full max-w-2xl justify-evenly md:justify-start md:gap-8">
        <CustomNavLink label="Dashboard" to="/dashboard" />
        <CustomNavLink label="Recipes" to="/recipes" />
        <CustomNavLink label="Meal planner" to="/meal-planner" />
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
