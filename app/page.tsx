import Image from 'next/image'
import Link from 'next/link'
import { Button } from '~/components/Button/Button'
import css from './page.module.css'

export default function Home() {
  return (
    <main>
      <section className={css.hero} aria-labelledby='hero-title'>
        <Image
          className={css.background}
          src='/HomeBackground.webp'
          alt='Car on the road'
          fill
          sizes='100vw'
          preload
        />
        <div className={css.overlay} aria-hidden='true' />

        <div className={css.content}>
          <div className={css.text}>
            <h1 className={css.title} id='hero-title'>
              Find your perfect rental car
            </h1>
            <p className={css.subtitle}>Reliable and budget-friendly rentals for any journey</p>
          </div>

          <Link className={css.catalogLink} href='/catalog'>
            <Button className={css.catalogButton} size='large'>
              View Catalog
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
