import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { fetchCarById } from '~/lib/api'
import { CarDetailsPage } from './CarDetailsPage.client'

type CarDetailsRouteProps = {
  params: Promise<{ carId: string }>
}

const getCarDetails = cache(async (carId: string) => {
  try {
    return await fetchCarById(carId)
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound()
    }

    throw error
  }
})

export const generateMetadata = async ({ params }: CarDetailsRouteProps): Promise<Metadata> => {
  const { carId } = await params
  const car = await getCarDetails(carId)
  const carName = `${car.brand} ${car.model}, ${car.year}`
  const description = `Rent ${carName} in ${car.location.city}, ${car.location.country} for $${car.rentalPrice} per hour. ${car.description}`

  return {
    title: `${carName} | RentalCar`,
    description,
    keywords: [car.brand, car.model, car.type, 'car rental', car.location.city],
    openGraph: {
      title: `${carName} | RentalCar`,
      description,
      images: [
        {
          url: car.img,
          alt: carName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${carName} | RentalCar`,
      description,
      images: [car.img],
    },
  }
}

export default async function CarDetailsRoute({ params }: CarDetailsRouteProps) {
  const { carId } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => getCarDetails(carId),
    staleTime: 1000 * 60,
  })

  const error = queryClient.getQueryState(['car', carId])?.error

  if (error) {
    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsPage carId={carId} />
    </HydrationBoundary>
  )
}
