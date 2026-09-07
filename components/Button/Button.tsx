import type { ButtonHTMLAttributes } from 'react'
import css from './Button.module.css'

export type ButtonVariant = 'primary' | 'outline'
export type ButtonSize = 'medium' | 'large'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  className,
  type = 'button',
  ...props
}: ButtonProps) => {
  const classes = [css.button, css[variant], css[size], className].filter(Boolean).join(' ')

  return <button className={classes} type={type} {...props} />
}
