'use client'

import { useId, type ChangeEvent, type SelectHTMLAttributes } from 'react'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import css from './Select.module.css'

export type SelectOption = {
  value: string
  label: string
}

export type SelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'children' | 'onChange' | 'value'
> & {
  label: string
  placeholder: string
  options: SelectOption[]
  value?: string
  onChange: (value: string) => void
  containerClassName?: string
}

export const Select = ({
  label,
  placeholder,
  options,
  value = '',
  onChange,
  containerClassName,
  className,
  id,
  ...props
}: SelectProps) => {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const containerClasses = [css.select, containerClassName].filter(Boolean).join(' ')
  const selectClasses = [css.control, className].filter(Boolean).join(' ')

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className={containerClasses}>
      <label className={css.label} htmlFor={selectId}>
        {label}
      </label>

      <div className={css.controlWrapper}>
        <select
          className={selectClasses}
          id={selectId}
          value={value}
          onChange={handleChange}
          {...props}
        >
          <option value='' disabled>
            {placeholder}
          </option>

          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <IoChevronDownOutline
          className={`${css.icon} ${css.iconDown}`}
          aria-hidden='true'
        />
        <IoChevronUpOutline
          className={`${css.icon} ${css.iconUp}`}
          aria-hidden='true'
        />
      </div>
    </div>
  )
}
