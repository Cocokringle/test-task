import type { IconType } from 'react-icons'
import css from './InfoItem.module.css'

type InfoItemProps = {
  Icon: IconType
  children: React.ReactNode
}

export const InfoItem = ({ Icon, children }: InfoItemProps) => (
  <li className={css.item}>
    <Icon className={css.icon} aria-hidden='true' />
    <span>{children}</span>
  </li>
)
