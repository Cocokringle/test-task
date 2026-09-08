'use client'

import { useId, type ChangeEvent } from 'react'
import css from './NumberRangeInput.module.css'

export type NumberRangeValue = {
  from: number | ''
  to: number | ''
}

export type NumberRangeInputProps = {
  label: string
  value: NumberRangeValue
  onChange: (value: NumberRangeValue) => void
  fromPlaceholder?: string
  toPlaceholder?: string
  fromName?: string
  toName?: string
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
}

export const NumberRangeInput = ({
  label,
  value,
  onChange,
  fromPlaceholder = 'From',
  toPlaceholder = 'To',
  fromName,
  toName,
  min,
  max,
  step,
  disabled = false,
  className,
}: NumberRangeInputProps) => {
  const generatedId = useId()
  const fromId = `${generatedId}-from`
  const toId = `${generatedId}-to`
  const classes = [css.range, className].filter(Boolean).join(' ')

  const handleChange =
    (field: keyof NumberRangeValue) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value

      onChange({
        ...value,
        [field]: nextValue === '' ? '' : event.target.valueAsNumber,
      })
    }

  return (
    <fieldset className={classes} disabled={disabled}>
      <legend className={css.label}>{label}</legend>

      <div className={css.controls}>
        <input
          className={css.control}
          id={fromId}
          name={fromName}
          type='number'
          inputMode='numeric'
          placeholder={fromPlaceholder}
          value={value.from}
          min={min}
          max={max}
          step={step}
          aria-label={`${label}: ${fromPlaceholder}`}
          onChange={handleChange('from')}
        />
        <input
          className={css.control}
          id={toId}
          name={toName}
          type='number'
          inputMode='numeric'
          placeholder={toPlaceholder}
          value={value.to}
          min={min}
          max={max}
          step={step}
          aria-label={`${label}: ${toPlaceholder}`}
          onChange={handleChange('to')}
        />
      </div>
    </fieldset>
  )
}
