import { NavLink } from '@remix-run/react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="flex gap-10 pb-12 pt-16">
      <CustomNavLink label="Dashboard" to="/dashboard" />
      <CustomNavLink label="Recipes" to="/recipes" />
      <CustomNavLink label="Meal planner" to="/meal-planner" />
      <CustomNavLink label="Settings" to="/settings" />
    </header>
  )
}

function CustomNavLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        'font-medium hover:text-blue-600 dark:hover:text-white ' +
        (isActive ? 'text-blue-600 hover:cursor-default dark:text-white' : undefined)
      }
      to={to}
    >
      {({ isActive }) => (
        <div>
          <div>{label}</div>

          {isActive ? (
            <motion.div
              transition={{ duration: '0.2' }}
              className="h-0.5 w-full bg-blue-500"
              layoutId="underline"
            ></motion.div>
          ) : null}
        </div>
      )}
    </NavLink>
  )
}
