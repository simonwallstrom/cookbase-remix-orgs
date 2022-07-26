import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1>Cookbase</h1>
      <p>Cookbase is a recipe organizer and meal planner for families.</p>
      <div>
        <Link className="text-link" to="/about">
          About Cookbase →
        </Link>
      </div>
    </div>
  );
}
