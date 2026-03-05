'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

type BreadcrumbsProps = {
  className?: string
}

export function Breadcrumbs({ className = '' }: BreadcrumbsProps) {
  const pathname = usePathname()

  // Parse path segments
  const segments = pathname.split('/').filter((segment) => segment.length > 0)

  // Build breadcrumb items
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/')
      // Convert hyphens/underscores to spaces and capitalize each word
      const label = segment
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
      return { label, href }
    })
  ]

  return (
    <nav className={`w-full text-lg font-bold ${className}`}>
      <ul className='flex gap-2 justify-start'>
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={breadcrumb.href} className='flex gap-2'>
              {isLast ? (
                <span className='text-black'>{breadcrumb.label}</span>
              ) : (
                <>
                  <Link href={breadcrumb.href} className='text-blue-600 hover:underline'>
                    {breadcrumb.label}
                  </Link>
                  <span className='text-gray-800'>{'/'}</span>
                </>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
