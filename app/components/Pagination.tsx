import { Link } from '@remix-run/react'

export default function Pagination({
  totalCount,
  currentPage,
}: {
  currentPage: number
  totalCount: number
}) {
  const take = 2
  const totalPages = totalCount / take
  const showingTo = currentPage * take
  const showingFrom = showingTo - take + 1

  console.log(showingFrom, showingTo)

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {currentPage > 1 ? <Link to={`/recipes?page=${currentPage - 1}`}>Previous</Link> : null}
      <div>
        Showing {showingFrom}-{showingTo} of {totalCount} recipes
      </div>
      {currentPage < totalPages ? <Link to={`/recipes?page=${currentPage + 1}`}>Next</Link> : null}
    </div>
  )
}
