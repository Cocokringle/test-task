import axios from 'axios'

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? error.message
  }

  return error instanceof Error ? error.message : 'Please try again later.'
}

export const formatMileage = (mileage: number): string =>
  new Intl.NumberFormat('uk-UA').format(mileage)
