'use client'

import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { BookingForm } from '~/components/BookingForm/BookingForm'
import { CarDetails } from '~/components/CarDetails/CarDetails'
import Loader from '~/components/Loader/Loader'
import { fetchCarById } from '~/lib/api'
import css from './CarDetailsPage.module.css'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'

type CarDetailsPageProps = {
  carId: string
}

export const CarDetailsPage = ({ carId }: CarDetailsPageProps) => {
  const carQuery = useQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
    staleTime: 1000 * 60,
  })

  if (carQuery.isPending) {
    return (
      <main className={css.main}>
        <div className={css.feedback}>
          <Loader text='Loading car details, please wait...' />
        </div>
      </main>
    )
  }

  if (carQuery.isError) {
    return <ErrorMessage />
  }

  const car = carQuery.data

  return (
    <main className={css.main}>
      <h1 className={css.visuallyHidden}>
        {car.brand} {car.model} rental details
      </h1>

      <div className={css.container}>
        <div className={css.leftColumn}>
          <div className={css.imageWrapper}>
            <Image
              className={css.image}
              src={car.img}
              alt={`${car.brand} ${car.model}, ${car.year}`}
              fill
              sizes='(max-width: 760px) calc(100vw - 32px), (max-width: 1080px) 55vw, 640px'
              preload
            />
          </div>

          <BookingForm carId={car.id} />
        </div>

        <CarDetails car={car} />
      </div>
    </main>
  )
}
