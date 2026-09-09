import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { notFound } from 'next/navigation'
import { fetchCarById } from '~/lib/api'
import { CarDetailsPage } from './CarDetailsPage.client'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Car Details | RentalCar',
  description: 'View car details and send a rental request.',
}

type CarDetailsRouteProps = {
  params: Promise<{ carId: string }>
}

export default async function CarDetailsRoute({ params }: CarDetailsRouteProps) {
  const { carId } = await params
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['car', carId],
    queryFn: () => fetchCarById(carId),
    staleTime: 1000 * 60,
  })

  const error = queryClient.getQueryState(['car', carId])?.error

  if (axios.isAxiosError(error) && error.response?.status === 404) {
    notFound()
  }

  if (error) {
    throw error
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetailsPage carId={carId} />
    </HydrationBoundary>
  )
}
