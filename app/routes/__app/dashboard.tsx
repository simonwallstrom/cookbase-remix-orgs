import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getUserById } from "~/models/user.server";
import { requireAuth } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const { userId } = await requireAuth(request);
  return await getUserById(userId);
}

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="mb-2 text-2xl">Dashboard</h1>
      <p className="mb-4">
        User: <strong>{data?.email}</strong>
        <br />
        Family: <strong>{data?.organization.name}</strong>
      </p>
      <Form action="/logout" method="post">
        <button type="submit" className="text-link">
          Logout
        </button>
      </Form>
    </div>
  );
}
