'use client'

import { useMemo, useState, type SubmitEvent } from 'react'
import { Button } from '~/components/Button/Button'
import {
  NumberRangeInput,
  type NumberRangeValue,
} from '~/components/NumberRangeInput/NumberRangeInput'
import { Select, type SelectOption } from '~/components/Select/Select'
import type { CarsFiltersResponse, FetchCarsParams } from '~/types/cars'
import css from './CatalogFilters.module.css'

type FilterForm = {
  brand: string
  price: string
  mileage: NumberRangeValue
}

type CatalogFiltersProps = {
  initialFilters: FetchCarsParams
  options?: CarsFiltersResponse
  isOptionsLoading?: boolean
  isSubmitting?: boolean
  onSubmit: (filters: FetchCarsParams) => void
  onClear: () => void
}

const EMPTY_FILTERS: FilterForm = {
  brand: '',
  price: '',
  mileage: { from: '', to: '' },
}

const toFilterForm = (filters: FetchCarsParams): FilterForm => ({
  brand: filters.brand ?? '',
  price: filters.price === undefined ? '' : String(filters.price),
  mileage: {
    from: filters.minMileage ?? '',
    to: filters.maxMileage ?? '',
  },
})

const toQueryFilters = ({ brand, price, mileage }: FilterForm): FetchCarsParams => ({
  ...(brand && { brand }),
  ...(price && { price: Number(price) }),
  ...(mileage.from !== '' && { minMileage: mileage.from }),
  ...(mileage.to !== '' && { maxMileage: mileage.to }),
})

export const CatalogFilters = ({
  initialFilters,
  options,
  isOptionsLoading = false,
  isSubmitting = false,
  onSubmit,
  onClear,
}: CatalogFiltersProps) => {
  const [formFilters, setFormFilters] = useState<FilterForm>(() =>
    toFilterForm(initialFilters),
  )
  const [validationMessage, setValidationMessage] = useState('')

  const brandOptions: SelectOption[] = useMemo(
    () =>
      options?.brands.map(brand => ({
        value: brand,
        label: brand,
      })) ?? [],
    [options],
  )

  const priceOptions: SelectOption[] = useMemo(() => {
    if (!options) return []

    const result: SelectOption[] = []
    for (let price = options.price.min; price <= options.price.max; price += 10) {
      result.push({ value: String(price), label: `$${price}` })
    }
    return result
  }, [options])

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (
      formFilters.mileage.from !== '' &&
      formFilters.mileage.to !== '' &&
      formFilters.mileage.from > formFilters.mileage.to
    ) {
      setValidationMessage('The minimum mileage cannot exceed the maximum mileage.')
      return
    }

    setValidationMessage('')
    onSubmit(toQueryFilters(formFilters))
  }

  const handleClear = () => {
    setFormFilters(EMPTY_FILTERS)
    setValidationMessage('')
    onClear()
  }

  return (
    <>
      <form className={css.filters} onSubmit={handleSubmit}>
        <div className={css.fields}>
          <Select
            containerClassName={css.brand}
            label='Car brand'
            placeholder='Choose a brand'
            options={brandOptions}
            value={formFilters.brand}
            disabled={isOptionsLoading}
            onChange={brand => setFormFilters(current => ({ ...current, brand }))}
          />

          <Select
            containerClassName={css.price}
            label='Price/ 1 hour'
            placeholder='Choose a price'
            options={priceOptions}
            value={formFilters.price}
            disabled={isOptionsLoading}
            onChange={price => setFormFilters(current => ({ ...current, price }))}
          />

          <NumberRangeInput
            className={css.mileage}
            label='Car mileage / km'
            value={formFilters.mileage}
            min={0}
            step={1}
            onChange={mileage => setFormFilters(current => ({ ...current, mileage }))}
          />
        </div>

        <div className={css.actions}>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Searching...' : 'Search'}
          </Button>
          <Button
            variant='link'
            type='button'
            disabled={isSubmitting}
            onClick={handleClear}
          >
            Clear filters
          </Button>
        </div>
      </form>

      {validationMessage && (
        <p className={css.validation} role='alert'>
          {validationMessage}
        </p>
      )}
    </>
  )
}
