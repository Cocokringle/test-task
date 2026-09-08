import Image from 'next/image'
import Link from 'next/link'
import type { Car } from '~/types/cars'
import buttonCss from '../Button/Button.module.css'
import css from './CarCard.module.css'

export interface CarCardProps {
  car: Car
  priority?: boolean
}

const formatMileage = (mileage: number): string =>
  new Intl.NumberFormat('uk-UA').format(mileage)

export const CarCard = ({ car, priority = false }: CarCardProps) => {
  const { brand, img, location, mileage, model, rentalCompany, rentalPrice, type, year } = car

  return (
    <article className={css.card}>
      <div className={css.content}>
        <div className={css.imageWrapper}>
          <Image
            className={css.image}
            src={img}
            alt={`${brand} ${model}`}
            fill
            sizes='(max-width: 640px) 244px, 244px'
            preload={priority}
          />
          <div className={css.imageOverlay} aria-hidden='true' />
        </div>

        <div className={css.details}>
          <div className={css.heading}>
            <h3 className={css.name} title={`${brand} ${model}, ${year}`}>
              {brand} <span className={css.model}>{model}</span>, {year}
            </h3>
            <p className={css.price}>${rentalPrice}</p>
          </div>

          <div className={css.meta}>
            <div className={css.metaRow}>
              <span>{location.city}</span>
              <span className={css.divider} aria-hidden='true' />
              <span>{location.country}</span>
              <span className={css.divider} aria-hidden='true' />
              <span className={css.company} title={rentalCompany}>
                {rentalCompany}
              </span>
            </div>

            <div className={css.metaRow}>
              <span className={css.carType} title={type}>
                {type}
              </span>
              <span className={css.divider} aria-hidden='true' />
              <span>{formatMileage(mileage)} km</span>
            </div>
          </div>
        </div>
      </div>

      <Link
        className={`${buttonCss.button} ${buttonCss.primary} ${buttonCss.large} ${css.readMoreLink}`}
        href={`/catalog/${car.id}`}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={`Read more about ${brand} ${model}`}
      >
        Read more
      </Link>
    </article>
  )
}
