import { Link, useSearchParams } from '@remix-run/react'

export default function Pagination({
  totalCount,
  currentPage,
}: {
  currentPage: number
  totalCount: number
}) {
  const take = 100
  const totalPages = totalCount / take

  let [params] = useSearchParams()
  params.delete('page')
  let query = params.toString()
  let baseUrl = query ? `?${query}&page=` : '?page='

  return (
    <div className="mt-8 flex items-center justify-between gap-4">
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
