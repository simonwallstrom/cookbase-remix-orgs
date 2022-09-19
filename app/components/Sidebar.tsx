import { Books, Clock, MagnifyingGlass, Plus, Star } from 'phosphor-react'
import { NavLink } from '@remix-run/react'
import { Button, ButtonLink } from './Button'

export default function Sidebar() {
  const user = {
    username: 'Familjen Wallström',
    imageUrl: 'https://simonwallstrom.com/_next/image?url=%2Fme.jpg&w=256&q=75',
    firstName: 'Simon',
    lastName: 'Wallström',
  }

  if (!user) return null

  return (
    <nav className="sticky top-0 hidden h-screen w-72 flex-col border-r px-8 py-5 lg:flex">
      <div className="flex-1">
        <CustomNavLink to={`/settings/`}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 flex-shrink-0">
              {user.imageUrl ? (
                <img
                  className="rounded-full ring-1 ring-gray-900 ring-opacity-10"
                  alt="Avatar"
                  src={user.imageUrl}
                />
              ) : null}
            </div>
            <div>
              <div className="text font-medium text-gray-900">{user?.username}</div>
              <div className="text-sm font-normal">
                {user?.firstName} {user?.lastName}
              </div>
            </div>
          </div>
        </CustomNavLink>

        <div className="mt-5 flex space-x-4">
          <ButtonLink href="recipes/new" className="flex-1">
            <Plus />
            <span>New recipe</span>
          </ButtonLink>
          <Button>
            <MagnifyingGlass />
          </Button>
        </div>

        <div className="mt-6 mb-3 px-3 font-mono text-xs tracking-tight text-gray-500">Recipes</div>

        <div className="flex-1 space-y-0.5">
          <CustomNavLink to="/recipes">
            <Books weight="duotone" size={20} />
            <span>All recipes</span>
          </CustomNavLink>
          <CustomNavLink to="/recipes/recent">
            <Clock weight="duotone" size={20} />
            <span>Most recent</span>
          </CustomNavLink>
          <CustomNavLink to="/">
            <Star weight="duotone" size={20} />
            <span>Starred</span>
          </CustomNavLink>
        </div>

        <div className="mt-6 mb-3 px-3 font-mono text-xs tracking-tight text-gray-500">
          Collections
        </div>

        <div className="flex-1 space-y-0.5">
          <CustomNavLink to="/home">
            <span className="mr-1 text-base leading-5">🌽</span>
            <span>Weeknight dinners</span>
          </CustomNavLink>
          <CustomNavLink to="/home">
            <span className="mr-1 text-base leading-5">🥦</span>
            <span>Healthy food</span>
          </CustomNavLink>
          <CustomNavLink to="/home">
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
        'flex items-center space-x-2 rounded-md border border-transparent py-2 px-3 ' +
        (isActive ? 'bg-gray-100  text-black' : 'hover:bg-gray-100 hover:text-black')
      }
      to={to}
      end
    >
      {children}
    </NavLink>
  )
}
