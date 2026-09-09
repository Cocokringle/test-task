import {
  PiCalendarBlank,
  PiCarProfile,
  PiCheckCircle,
  PiGasPump,
  PiGear,
  PiMapPin,
  PiRoadHorizon,
} from 'react-icons/pi'
import { InfoItem } from '~/components/InfoItem/InfoItem'
import { formatMileage } from '~/lib/utils'
import type { Car } from '~/types/cars'
import css from './CarDetails.module.css'

type CarDetailsProps = {
  car: Car
}

export const CarDetails = ({ car }: CarDetailsProps) => {
  return (
    <article className={css.card}>
      <div className={css.summary}>
        <div className={css.titleRow}>
          <h2 className={css.title}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <span className={css.article}>Article: {car.stockNumber}</span>
        </div>

        <div className={css.location}>
          <PiMapPin className={css.locationIcon} aria-hidden='true' />
          <span>
            {car.location.city}, {car.location.country}
          </span>
        </div>

        <p className={css.price}>${car.rentalPrice}</p>
        <p className={css.description}>{car.description}</p>
      </div>

      <div className={css.information}>
        <section className={css.section}>
          <h3 className={css.sectionTitle}>Rental Conditions:</h3>
          <ul className={css.list}>
            {car.rentalConditions.map(condition => (
              <InfoItem Icon={PiCheckCircle} key={condition}>
                {condition}
              </InfoItem>
            ))}
          </ul>
        </section>

        <section className={`${css.section} ${css.divided}`}>
          <h3 className={css.sectionTitle}>Car Specifications:</h3>
          <ul className={css.list}>
            <InfoItem Icon={PiCalendarBlank}>Year: {car.year}</InfoItem>
            <InfoItem Icon={PiCarProfile}>Type: {car.type}</InfoItem>
            <InfoItem Icon={PiGasPump}>Fuel Consumption: {car.fuelConsumption}</InfoItem>
            <InfoItem Icon={PiGear}>Engine: {car.engine}</InfoItem>
            <InfoItem Icon={PiRoadHorizon}>
              Mileage: {formatMileage(car.mileage)} km
            </InfoItem>
          </ul>
        </section>

        <section className={`${css.section} ${css.divided}`}>
          <h3 className={css.sectionTitle}>Features</h3>
          <ul className={css.list}>
            {car.features.map(feature => (
              <InfoItem Icon={PiCheckCircle} key={feature}>
                {feature}
              </InfoItem>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
