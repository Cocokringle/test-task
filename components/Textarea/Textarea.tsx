'use client'

import { useId, type TextareaHTMLAttributes } from 'react'
import { useField } from 'formik'
import { IoAlertCircleOutline } from 'react-icons/io5'
import css from './Textarea.module.css'

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'name' | 'value' | 'defaultValue' | 'onChange' | 'onBlur'
> & {
  name: string
  label: string
  containerClassName?: string
}

export const Textarea = ({
  name,
  label,
  placeholder = label,
  id,
  className,
  containerClassName,
  'aria-describedby': ariaDescribedBy,
  ...props
}: TextareaProps) => {
  const [field, meta] = useField<string>(name)
  const generatedId = useId()
  const textareaId = id ?? generatedId
  const errorId = `${textareaId}-error`
  const error = meta.touched && typeof meta.error === 'string' ? meta.error : ''
  const containerClasses = [css.field, containerClassName].filter(Boolean).join(' ')
  const textareaClasses = [css.textarea, error && css.textareaError, className]
    .filter(Boolean)
    .join(' ')
  const describedBy = [ariaDescribedBy, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className={containerClasses}>
      <div className={css.controlWrapper}>
        <label className={css.visuallyHidden} htmlFor={textareaId}>
          {label}
        </label>
        <textarea
          {...field}
          {...props}
          className={textareaClasses}
          id={textareaId}
          placeholder={placeholder}
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
