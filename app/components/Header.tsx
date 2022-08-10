import { NavLink } from '@remix-run/react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="sticky top-0 border-b-2 border-black bg-white px-6">
      <div className="mx-auto flex w-full max-w-2xl gap-8">
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
      {/* {({ isActive }) => (
        <>
          <div className="relative z-10">{label}</div>

          {isActive ? (
            <motion.div
              transition={{ duration: '.2' }}
              className="absolute bottom-0 left-0 z-10 h-0.5 w-full bg-pink-500"
              layoutId="underline"
            ></motion.div>
          ) : null}
        </>
      )} */}
    </NavLink>
  )
}
