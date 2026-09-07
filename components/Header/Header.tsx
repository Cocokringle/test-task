'use client'

import css from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/catalog', label: 'Catalog' },
]

export const Header = () => {
  const pathname = usePathname()

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link className={css.logoLink} href='/' aria-label='RentalCar home page'>
          <Image src='/Logo.png' alt='RentalCar' width={104} height={16} preload />
        </Link>

        <nav aria-label='Primary navigation'>
          <ul className={css.navigation}>
            {navigation.map(({ href, label }) => {
              const isActive = pathname === href
              const classes = [css.navigationLink, isActive && css.active]
                .filter(Boolean)
                .join(' ')

              return (
                <li key={href}>
                  <Link className={classes} href={href} aria-current={isActive ? 'page' : undefined}>
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}
