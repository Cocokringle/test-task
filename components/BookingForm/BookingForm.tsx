'use client'

import { useMutation } from '@tanstack/react-query'
import { Form, Formik, type FormikHelpers } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { createBookingRequest } from '~/lib/api'
import { getErrorMessage } from '~/lib/utils'
import type { CreateBookingRequest } from '~/types/cars'
import { Button } from '../Button/Button'
import { Textarea } from '../Textarea/Textarea'
import { TextInput } from '../TextInput/TextInput'
import css from './BookingForm.module.css'

type BookingFormProps = {
  carId: string
}

type BookingFormValues = Required<CreateBookingRequest>

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  comment: '',
}

const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(50, 'Name must be 50 characters or fewer.')
    .required('Name is required.'),
  email: Yup.string()
    .trim()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  comment: Yup.string()
    .trim()
    .max(500, 'Comment must be 500 characters or fewer.')
    .optional(),
})

export const BookingForm = ({ carId }: BookingFormProps) => {
  const bookingMutation = useMutation({
    mutationFn: (bookingRequest: CreateBookingRequest) =>
      createBookingRequest(carId, bookingRequest),
    onSuccess: response => {
      toast.success(response.message)
    },
    onError: error => {
      toast.error(getErrorMessage(error))
    },
  })

  const handleSubmit = async (
    values: BookingFormValues,
    actions: FormikHelpers<BookingFormValues>,
  ) => {
    const comment = values.comment.trim()

    try {
      await bookingMutation.mutateAsync({
        name: values.name.trim(),
        email: values.email.trim(),
        ...(comment ? { comment } : {}),
      })

      actions.resetForm()
    } catch {
      // The mutation's onError handler displays the API error.
    }
  }

  return (
    <section className={css.card} aria-labelledby='booking-form-title'>
      <div className={css.heading}>
        <h2 className={css.title} id='booking-form-title'>
          Book your car now
        </h2>
        <p className={css.description}>Stay connected! We are always ready to help you.</p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={bookingSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form} noValidate>
            <div className={css.fields}>
              <TextInput name='name' label='Name*' autoComplete='name' />
              <TextInput name='email' label='Email*' type='email' autoComplete='email' />
              <Textarea name='comment' label='Comment' rows={3} />
            </div>

            <Button
              className={css.submit}
              type='submit'
              disabled={isSubmitting || bookingMutation.isPending}
            >
              {isSubmitting || bookingMutation.isPending ? 'Sending...' : 'Send'}
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
