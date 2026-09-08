'use client'

import { useId, type InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import { IoAlertCircleOutline } from 'react-icons/io5'
import css from './TextInput.module.css'

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
> & {
  name: string
  label: string
  containerClassName?: string
}

export const TextInput = ({
  name,
  label,
  placeholder = label,
  id,
  className,
  containerClassName,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextInputProps) => {
  const [field, meta] = useField<string>(name)
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const error = meta.touched && typeof meta.error === 'string' ? meta.error : ''
  const containerClasses = [css.field, containerClassName].filter(Boolean).join(' ')
  const inputClasses = [css.input, error && css.inputError, className]
    .filter(Boolean)
    .join(' ')
  const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={containerClasses}>
      <div className={css.controlWrapper}>
        <label className={error ? css.labelError : css.visuallyHidden} htmlFor={inputId}>
          {label}
        </label>
        <input
          {...field}
          {...props}
          className={inputClasses}
          id={inputId}
          placeholder={error ? undefined : placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
        />

        {error && <IoAlertCircleOutline className={css.errorIcon} aria-hidden='true' />}
      </div>

      {error && (
        <p className={css.errorMessage} id={errorId} role='alert'>
          {error}
        </p>
      )}
    </div>
  )
}
