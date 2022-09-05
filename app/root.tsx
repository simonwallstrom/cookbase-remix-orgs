import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import styles from './tailwind.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Cookbase',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'icon', href: '/favicon.svg' },
]

export default function App() {
  return (
    <html className="h-full min-h-full" lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-full flex-col text-sm text-gray-700 selection:bg-yellow-200">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  return (
    <html className="h-full min-h-full bg-gray-100" lang="en">
      <head>
        <Meta />
        <Links />
        <title>Cookbase</title>
      </head>
      <body className="flex min-h-full flex-col text-sm text-gray-700 selection:bg-yellow-200">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <h1>{caught.status}</h1>
          <p>{caught.data}</p>
        </div>
        <Scripts />
      </body>
    </html>
  )
}
