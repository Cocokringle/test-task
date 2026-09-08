import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { fetchCars, fetchCarsFilters } from '~/lib/api'
import {
  createCatalogSearchParams,
  getCatalogFiltersFromRecord,
  type CatalogSearchParams,
} from '~/lib/catalogFilters'
import { PER_PAGE } from '~/lib/constants'
import { Catalog } from './Catalog.client'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Car Catalog | RentalCar',
  description:
    'Browse available rental cars and filter them by brand, hourly price, and mileage.',
}

type CatalogPageProps = {
  searchParams: Promise<CatalogSearchParams>
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const filters = getCatalogFiltersFromRecord(await searchParams)
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['car-filters'],
      queryFn: fetchCarsFilters,
      staleTime: 1000 * 60 * 30,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ['cars', filters],
      queryFn: ({ pageParam }) =>
        fetchCars({ ...filters, page: pageParam, perPage: PER_PAGE }),
      initialPageParam: 1,
      staleTime: 1000 * 60,
      getNextPageParam: lastPage =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
      pages: 1,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog key={createCatalogSearchParams(filters).toString()} initialFilters={filters} />
    </HydrationBoundary>
  )
}
