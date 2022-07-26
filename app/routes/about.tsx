import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";

export async function loader({ request }: LoaderArgs) {
  return prisma.recipe.findMany({});
}

export default function AboutPage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1>About Cookbase</h1>
      <p>
        This is our about page. Here's some recipes from a Postgres database...
      </p>
      <div>
        {data.map((recipe) => (
          <div key={recipe.id}>{recipe.title}</div>
        ))}
      </div>
      <div>
        <Link className="text-link" to="/">
          ← Back to startpage
        </Link>
      </div>
    </div>
  );
}
