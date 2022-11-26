import { NavLink } from '@remix-run/react'
import { Hash, Heart, MagnifyingGlass, SquaresFour, UserCircle } from 'phosphor-react'

export default function Sidebar() {
  return (
    <header className="sticky top-0 h-screen w-60 border-r bg-gray-100 p-4">
      <div>
        <CustomNavLink to="/settings">
          <UserCircle weight="duotone" size={16} />
          <span>Familjen Wallström</span>
        </CustomNavLink>
      </div>

      <div className="mt-4 space-y-0.5">
        <CustomNavLink to="/recipes">
          <SquaresFour weight="duotone" size={16} />
          <span>All recipes</span>
        </CustomNavLink>
        <CustomNavLink to="/tags">
          <MagnifyingGlass weight="duotone" size={16} />
          <span>Search</span>
        </CustomNavLink>
        <CustomNavLink to="/favorites">
          <Heart weight="duotone" size={16} />
          <span>Favorites</span>
        </CustomNavLink>
      </div>

      <div className="mt-4">
        <div className="mb-1 px-2">
          <span className="text-xs text-gray-500">Tags</span>
        </div>
        <CustomNavLink to="/">
          <Hash weight="duotone" size={16} />
          <span>Weeknight dinners</span>
        </CustomNavLink>
        <CustomNavLink to="/">
          <Hash weight="duotone" size={16} />
          <span>Healthy food</span>
        </CustomNavLink>
        <CustomNavLink to="/">
          <Hash weight="duotone" size={16} />
          <span>Italian dishes</span>
        </CustomNavLink>
      </div>
    </header>
  )
}

function CustomNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      className={({ isActive }) =>
        'flex items-center gap-2 rounded-md px-2 py-1 ' +
        (isActive
          ? 'bg-gray-200 text-gray-900'
          : 'hover:bg-gray-200 hover:bg-opacity-50 hover:text-gray-900 active:text-gray-600')
      }
      to={to}
    >
      {children}
    </NavLink>
  )
}
