'use client'

import { useMemo, useTransition } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '~/components/Button/Button'
import { CarCard } from '~/components/CarCard/CarCard'
import { CatalogFilters } from '~/components/CatalogFilters/CatalogFilters'
import { CatalogLoader } from '~/components/CatalogLoader/CatalogLoader'
import ErrorMessage from '~/components/ErrorMessage/ErrorMessage'
import { NoCarsFound } from '~/components/NoCarsFound/NoCarsFound'
import { fetchCars, fetchCarsFilters } from '~/lib/api'
import { createCatalogSearchParams } from '~/lib/catalogFilters'
import { PER_PAGE } from '~/lib/constants'
import { getErrorMessage } from '~/lib/utils'
import type { FetchCarsParams } from '~/types/cars'
import css from './Catalog.module.css'

type CatalogProps = {
  initialFilters: FetchCarsParams
}

export const Catalog = ({ initialFilters }: CatalogProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, startTransition] = useTransition()

  const filtersQuery = useQuery({
    queryKey: ['car-filters'],
    queryFn: fetchCarsFilters,
    staleTime: 1000 * 60 * 30,
  })

  const carsQuery = useInfiniteQuery({
    queryKey: ['cars', initialFilters],
    queryFn: ({ pageParam }) =>
      fetchCars({ ...initialFilters, page: pageParam, perPage: PER_PAGE }),
    initialPageParam: 1,
    staleTime: 1000 * 60,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  })

  const cars = useMemo(
    () => carsQuery.data?.pages.flatMap(page => page.cars) ?? [],
    [carsQuery.data],
  )

  const isCatalogLoading =
    isNavigating || (carsQuery.isFetching && !carsQuery.isFetchingNextPage)

  const handleFiltersSubmit = (filters: FetchCarsParams) => {
    const search = createCatalogSearchParams(filters).toString()

    startTransition(() => {
      router.push(search ? `${pathname}?${search}` : pathname, { scroll: false })
    })
  }

  const handleFiltersClear = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }

  return (
    <main className={css.main}>
      <h1 className={css.visuallyHidden}>Rental car catalog</h1>

      <div className={css.container}>
        <CatalogFilters
          initialFilters={initialFilters}
          options={filtersQuery.data}
          isOptionsLoading={filtersQuery.isPending || filtersQuery.isError}
          isSubmitting={isCatalogLoading}
          onSubmit={handleFiltersSubmit}
          onClear={handleFiltersClear}
        />

        {filtersQuery.isError && (
          <p className={css.filterWarning} role='status'>
            Filter options are temporarily unavailable. You can still browse all cars.
          </p>
        )}

        <div className={css.results} aria-busy={isCatalogLoading}>
          {carsQuery.isError && <ErrorMessage message={getErrorMessage(carsQuery.error)} />}

          {carsQuery.isSuccess && cars.length === 0 && (
            <NoCarsFound onReset={handleFiltersClear} />
          )}

          {cars.length > 0 && (
            <section aria-label='Available cars'>
              <ul className={css.grid}>
                {cars.map((car, index) => (
                  <li className={css.gridItem} key={car.id}>
                    <CarCard
                      car={car}
                      priority={index < 4}
                    />
                  </li>
                ))}
              </ul>

              {carsQuery.hasNextPage && (
                <div className={css.loadMoreWrapper}>
                  <Button
                    variant='outline'
                    onClick={() => carsQuery.fetchNextPage()}
                    disabled={carsQuery.isFetchingNextPage}
                  >
                    {carsQuery.isFetchingNextPage ? 'Loading...' : 'Load more'}
                  </Button>
                </div>
              )}

              {carsQuery.isFetchNextPageError && (
                <p className={css.loadMoreError} role='alert'>
                  Could not load more cars. Please try again.
                </p>
              )}
            </section>
          )}

          {isCatalogLoading && <CatalogLoader />}
        </div>
      </div>
    </main>
  )
}
