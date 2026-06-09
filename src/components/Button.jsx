const Button = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    onClick,
    isDisabled
  } = props

  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
export default Button