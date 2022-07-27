import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="mx-auto w-full max-w-md px-8">
        <Outlet />
      </div>
    </div>
  );
}
