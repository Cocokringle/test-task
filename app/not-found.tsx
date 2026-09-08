import type { Metadata } from 'next'
import css from './not-found.module.css'

const title = 'Page not found'
const description = 'The requested page does not exist.'

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
}

export default function NotFound() {
  return (
    <section className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </section>
  )
}
