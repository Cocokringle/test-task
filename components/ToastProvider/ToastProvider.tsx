'use client'

import { ToastContainer } from 'react-toastify'

export const ToastProvider = () => (
  <ToastContainer position='top-right' autoClose={4000} closeOnClick pauseOnHover />
)
