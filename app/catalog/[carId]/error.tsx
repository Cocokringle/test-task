'use client'

import css from './error.module.css'

type ErrorProps = {
  error: Error
}

const Error = ({ error }: ErrorProps) => {
  return (
    <main className={css.main}>
      <p className={css.message} role='alert'>
        Could not fetch car details. {error.message}
      </p>
    </main>
  )
}

export default Error
