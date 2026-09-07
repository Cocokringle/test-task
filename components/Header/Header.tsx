import css from './Header.module.css'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link className={css.logoLink} href='/' aria-label='RentalCar home page'>
          <Image src='/Logo.png' alt='RentalCar' width={104} height={16} preload />
        </Link>

        <nav aria-label='Primary navigation'>
          <ul className={css.navigation}>
            <li>
              <Link className={css.navigationLink} href='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className={css.navigationLink} href='/catalog'>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
