import { Link, useSearchParams } from '@remix-run/react'

export default function Pagination({
  totalCount,
  currentPage,
}: {
  currentPage: number
  totalCount: number
}) {
  const take = 2
  const totalPages = totalCount / take

  let [params] = useSearchParams()
  params.delete('page')
  let query = params.toString()
  let baseUrl = query ? `?${query}&page=` : '?page='

  return (
    <div className="flex items-center justify-between gap-4 mt-8">
      <div>
        {currentPage > 1 ? (
          <Link prefetch="intent" to={`${baseUrl}${currentPage - 1}`}>
            ← Previous page
          </Link>
        ) : null}
      </div>
      <div>
        {currentPage < totalPages ? (
          <Link prefetch="intent" to={`${baseUrl}${currentPage + 1}`}>
            Next page →
          </Link>
        ) : null}
      </div>
    </div>
  )
}
