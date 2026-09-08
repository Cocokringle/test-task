export interface CarLocation {
  country: string
  city: string
  address: string
}

export interface Car {
  id: string
  year: number
  brand: string
  model: string
  type: string
  img: string
  description: string
  fuelConsumption: number
  engine: string
  rentalPrice: string
  rentalCompany: string
  rentalConditions: string[]
  mileage: number
  stockNumber: number
  features: string[]
  location: CarLocation
  createdAt: string
  updatedAt: string
}

export interface FetchCarsParams {
  brand?: string
  price?: number
  minMileage?: number
  maxMileage?: number
  perPage?: number
  page?: number
}

export interface FetchCarsResponse {
  cars: Car[]
  totalCars: number
  totalPages: number
  page: number
  perPage: number
}

export interface CarPriceRange {
  min: number
  max: number
}

export interface CarsFiltersResponse {
  brands: string[]
  price: CarPriceRange
}

export interface CreateBookingRequest {
  name: string
  email: string
  comment?: string
}

export interface CreateBookingResponse {
  message: string
}
