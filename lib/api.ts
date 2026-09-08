import axios, { type AxiosResponse } from 'axios'
import type {
  Car,
  CarsFiltersResponse,
  CreateBookingRequest,
  CreateBookingResponse,
  FetchCarsParams,
  FetchCarsResponse,
} from '../types/cars'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
})

export const fetchCars = async (params: FetchCarsParams = {}): Promise<FetchCarsResponse> => {
  const response: AxiosResponse<FetchCarsResponse> = await client.get('/cars', {
    params,
  })

  return response.data
}

export const fetchCarsFilters = async (): Promise<CarsFiltersResponse> => {
  const response: AxiosResponse<CarsFiltersResponse> = await client.get('/cars/filters')

  return response.data
}

export const fetchCarById = async (id: string): Promise<Car> => {
  const response: AxiosResponse<Car> = await client.get(`/cars/${id}`)

  return response.data
}

export const createBookingRequest = async (
  carId: string,
  bookingRequest: CreateBookingRequest,
): Promise<CreateBookingResponse> => {
  const response: AxiosResponse<CreateBookingResponse> = await client.post(
    `/cars/${carId}/booking-requests`,
    bookingRequest,
  )

  return response.data
}
