import type { FetchCarsParams } from '~/types/cars'

export const CATALOG_FILTER_KEYS = ['brand', 'price', 'minMileage', 'maxMileage'] as const

export type CatalogFilterKey = (typeof CATALOG_FILTER_KEYS)[number]
export type CatalogSearchParams = Record<string, string | string[] | undefined>

const parseNumber = (value: string | null | undefined, integer = false) => {
  if (!value) return undefined

  const number = Number(value)
  if (!Number.isFinite(number) || number < 0 || (integer && !Number.isInteger(number))) {
    return undefined
  }

  return number
}

export const parseCatalogFilters = (
  getValue: (key: CatalogFilterKey) => string | null | undefined,
): FetchCarsParams => {
  const brand = getValue('brand')?.trim()
  const price = parseNumber(getValue('price'))
  const minMileage = parseNumber(getValue('minMileage'), true)
  const maxMileage = parseNumber(getValue('maxMileage'), true)

  return {
    ...(brand && { brand }),
    ...(price !== undefined && { price }),
    ...(minMileage !== undefined && { minMileage }),
    ...(maxMileage !== undefined && { maxMileage }),
  }
}

export const getCatalogFiltersFromRecord = (
  searchParams: CatalogSearchParams,
): FetchCarsParams =>
  parseCatalogFilters(key => {
    const value = searchParams[key]
    return Array.isArray(value) ? value[0] : value
  })

export const createCatalogSearchParams = (filters: FetchCarsParams) => {
  const searchParams = new URLSearchParams()

  CATALOG_FILTER_KEYS.forEach(key => {
    const value = filters[key]
    if (value !== undefined && value !== '') searchParams.set(key, String(value))
  })

  return searchParams
}
