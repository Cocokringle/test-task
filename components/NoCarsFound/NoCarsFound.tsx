import Image from 'next/image'
import { Button } from '~/components/Button/Button'
import css from './NoCarsFound.module.css'

type NoCarsFoundProps = {
  onReset: () => void
}

export const NoCarsFound = ({ onReset }: NoCarsFoundProps) => {
  return (
    <section
      className={css.emptyState}
      aria-labelledby='no-cars-found-title'
      aria-describedby='no-cars-found-description'
    >
      <Image
        className={css.image}
        src='/NotFoundCars.webp'
        alt='Placeholder image of a car with a magnifying glass'
        width={414}
        height={388}
        sizes='(max-width: 480px) calc(100vw - 32px), 414px'
      />

      <div className={css.message}>
        <h2 className={css.title} id='no-cars-found-title'>
          No cars found
        </h2>
        <p className={css.description} id='no-cars-found-description'>
          We couldn&apos;t find any cars that match your current filters. Try changing your search
          criteria or reset the filters.
        </p>
      </div>

      <Button variant='outline' onClick={onReset}>
        Reset filters
      </Button>
    </section>
  )
}
