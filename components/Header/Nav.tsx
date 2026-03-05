'use client'

import Link from 'next/link'

type NavLink = {
  label: string
  href: string
}

type NavProps = {
  links: NavLink[]
}

export function Nav({ links }: NavProps) {
  return (
    <nav className='bg-black text-white'>
      <div className='container py-4 flex items-center justify-between'>
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
