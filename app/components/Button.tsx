import { Link } from '@remix-run/react'
import clsx from 'clsx'
import React from 'react'

type BaseProps = {
  children: React.ReactNode | React.ReactNode[]
  variant?: 'default' | 'secondary' | 'primary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  classNames?: string
}

type LinkProps = BaseProps & {
  href: string
}

type ButtonAsButton = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
type ButtonAsLink = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>

const shared =
  'flex items-center justify-center rounded-lg active:scale-[.99] border disabled:bg-opacity-90'

const getVariant = (variant: BaseProps['variant']) => {
  if (variant === 'primary') return 'border-black bg-gray-800 text-white shadow hover:bg-gray-900'
  if (variant === 'secondary')
    return 'border-gray-300 focus:outline-gray-900 bg-white shadow-sm hover:bg-gray-50'
  if (variant === 'danger')
    return 'border-red-400 focus:outline-red-500 bg-red-100 text-red-600 hover:text-red-800 hover:border-red-500 shadow-sm hover:bg-red-200'
}

const getSize = (size: BaseProps['size']) => {
  if (size === 'sm') return 'px-3.5 py-1 space-x-2'
  if (size === 'md') return 'px-4 py-1.5 space-x-2.5'
  if (size === 'lg') return 'px-8 py-3 space-x-3'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonAsButton>(function Button(
  { variant = 'secondary', size = 'md', className, children, ...buttonProps },
  ref: any
) {
  return (
    <button
      ref={ref}
      className={clsx(shared, getVariant(variant), getSize(size), className)}
      {...buttonProps}
    >
      {children}
    </button>
  )
})

export const ButtonLink: React.FunctionComponent<ButtonAsLink> = ({
  children,
  variant = 'secondary',
  size = 'md',
  href,
  className,
  ...buttonProps
}) => {
  if (href && href.startsWith('https://')) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(shared, getVariant(variant), getSize(size), className)}
        {...buttonProps}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      to={href}
      className={clsx(shared, getVariant(variant), getSize(size), className)}
      {...buttonProps}
    >
      {children}
    </Link>
  )
}
