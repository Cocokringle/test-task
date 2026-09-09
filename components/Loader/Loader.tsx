import css from './Loader.module.css'

type LoaderProps = {
  text?: string
}

const Loader = ({ text = 'Loading cars, please wait...' }: LoaderProps) => {
  return <p className={css.text}>{text}</p>
}

export default Loader
