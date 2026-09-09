import css from './ErrorMessage.module.css'

const ErrorMessage = ({ message }: { message?: string }) => {
  return <p className={css.text}>{message || 'Something went wrong.'}</p>
}

export default ErrorMessage
