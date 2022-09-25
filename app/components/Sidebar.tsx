import { Link, NavLink } from '@remix-run/react'
import { CalendarCheck, Hamburger, HouseLine, Plus } from 'phosphor-react'

export default function Sidebar() {
  const user = {
    username: 'Familjen Wallström',
    imageUrl: 'https://simonwallstrom.com/_next/image?url=%2Fme.jpg&w=256&q=75',
    firstName: 'Simon',
    lastName: 'Wallström',
  }

  if (!user) return null

  return (
    <nav className="sticky top-0 hidden h-screen w-64 flex-col border-r px-4 py-8 lg:flex">
      <div className="flex-1">
        <CustomNavLink to={`/settings/`}>
          <div className="flex items-center gap-2.5">
            <div className="h-5 w-5 flex-shrink-0">
              {user.imageUrl ? (
                <img className="rounded-md" alt="Avatar" src={user.imageUrl} />
              ) : null}
            </div>
            <div className="leading-snug text-gray-900">{user?.username}</div>
          </div>
        </CustomNavLink>

        <div className="mt-5 flex-1 space-y-0.5">
          <CustomNavLink to="/home">
            <HouseLine weight="duotone" size={20} />
            <span>Home</span>
          </CustomNavLink>
          <CustomNavLink to="/recipes">
            <Hamburger weight="duotone" size={20} />
            <span>Recipes</span>
          </CustomNavLink>
          <CustomNavLink to="/meal-planner">
            <CalendarCheck weight="duotone" size={20} />
            <span>Meal planner</span>
          </CustomNavLink>
        </div>

        <div className="mt-6 mb-3 flex items-center justify-between pl-3 pr-2 text-gray-500">
          <Link
            to="/collections"
            className="font-mono text-[12px] uppercase tracking-wider hover:text-gray-900"
          >
            Collections
          </Link>
          <Link
            className="rounded-md p-1 hover:bg-gray-200 hover:text-gray-900"
            to="/collections/new"
          >
            <Plus />
          </Link>
        </div>

        <div className="flex-1 space-y-0.5">
          <CustomNavLink to="/">
            <span className="mr-1 text-base leading-5">🌽</span>
            <span>Weeknight dinners</span>
          </CustomNavLink>
          <CustomNavLink to="/">
            <span className="mr-1 text-base leading-5">🥦</span>
            <span>Healthy food</span>
          </CustomNavLink>
          <CustomNavLink to="/">
            <span className="mr-1 text-base leading-5">🇮🇹</span>
            <span>Italian goodness</span>
          </CustomNavLink>
        </div>
      </div>
      <div className="flex justify-between text-xs">
        <form action="/logout" method="post">
          <button type="submit" className="button">
            Logout
          </button>
        </form>
      </div>
    </nav>
  )
}

function CustomNavLink({ children, to }: { children: React.ReactNode; to: string }) {
  return (
    <NavLink
      className={({ isActive }) =>
        'flex items-center space-x-2 rounded-lg border border-transparent py-2 px-3 ' +
        (isActive ? 'bg-gray-200 bg-opacity-70  text-black' : 'hover:bg-gray-100 hover:text-black')
      }
      to={to}
      end
    >
      {children}
    </NavLink>
  )
}
