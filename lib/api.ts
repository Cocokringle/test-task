import axios, { type AxiosResponse } from 'axios'

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
})
