const Button = (props) => {
  const {
    className = '',
    type = 'button',
    children,
    onClick
  } = props

  return (
    <button
      onClick={onClick}
      className={`button ${className}`}
      type={type}
    >
      {children}
    </button>
  )
}
export default Button