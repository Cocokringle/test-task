export const getErrorMessage = (error: unknown): string =>
  error instanceof Error ? error.message : 'Please try again later.'

export const formatMileage = (mileage: number): string =>
  new Intl.NumberFormat('uk-UA').format(mileage)
