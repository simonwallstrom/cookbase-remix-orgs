import { Link } from '@remix-run/react'

export default function NewRecipe() {
  return (
    <div>
      <div>
        <h1>New recipe</h1>
        <p className="mt-2">Add a new recipe to your collection.</p>
      </div>
      <div className="box mt-8 px-8 py-7">
        <h2>Title</h2>
      </div>
    </div>
  )
}
