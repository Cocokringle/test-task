import css from './CatalogLoader.module.css'

export const CatalogLoader = () => {
  return (
    <div className={css.backdrop} aria-live='polite' aria-busy='true'>
      <div className={css.panel} role='status'>
        <span className={css.spinner} aria-hidden='true' />

        <div className={css.content}>
          <p className={css.title}>Loading cars...</p>
          <p className={css.description}>
            Please wait while we fetch the best
            <br />
            cars for you
          </p>
        </div>
      </div>
    </div>
  )
}
