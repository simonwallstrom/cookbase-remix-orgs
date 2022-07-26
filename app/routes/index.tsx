import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getUserId } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  let userId = await getUserId(request);
  if (userId === undefined) return null;
  return userId;
}

export default function Index() {
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1>Cookbase</h1>
      <p>Cookbase is a recipe organizer and meal planner for families.</p>
      {user ? (
        <Link className="text-link" to="dashboard">
          Go to dashboard
        </Link>
      ) : (
        <div className="flex gap-8">
          <Link className="text-link" to="/signup">
            Signup to get started
          </Link>
          <Link className="text-link" to="/login">
            Login to continue
          </Link>
        </div>
      )}
    </div>
  );
}
