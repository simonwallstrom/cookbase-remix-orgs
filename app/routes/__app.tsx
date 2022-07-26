import { json, type LoaderArgs } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { requireAuth } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await requireAuth(request),
  });
}

export default function AppLayout() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <header className="flex gap-10 pb-12 pt-16">
        <NavLink
          className={({ isActive }) =>
            "font-medium hover:text-black dark:hover:text-white " +
            (isActive
              ? "text-black underline underline-offset-2 hover:cursor-default dark:text-white"
              : undefined)
          }
          to="dashboard"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "font-medium hover:text-black dark:hover:text-white " +
            (isActive
              ? "text-black underline underline-offset-2 hover:cursor-default dark:text-white"
              : undefined)
          }
          to="/recipes"
        >
          Recipes
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "font-medium hover:text-black dark:hover:text-white " +
            (isActive
              ? "text-black underline underline-offset-2 hover:cursor-default dark:text-white"
              : undefined)
          }
          to="/meal-planner"
        >
          Meal planner
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            "font-medium hover:text-black dark:hover:text-white " +
            (isActive
              ? "text-black underline underline-offset-2 hover:cursor-default dark:text-white"
              : undefined)
          }
          to="/settings"
        >
          Settings
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
}
