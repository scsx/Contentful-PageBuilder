'use client'

import Link from 'next/link'

interface NavLink {
  readonly label: string
  readonly href: string
}

interface NavProps {
  readonly links: NavLink[]
}

export function Nav({ links }: NavProps) {
  return (
    <nav className='bg-black text-white'>
      <div className='max-w-6xl mx-auto px-6 py-4 flex items-center justify-between'>
        <Link href='/' className='text-2xl font-bold'>
          PB
        </Link>

        <ul className='flex gap-6'>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className='hover:text-gray-300 transition-colors'>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
