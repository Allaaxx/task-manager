const Button = ({ children, variant = "primary" }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-pink-500 text-white"
    }

    if (variant === "ghost") {
      return "bg-transparent] text-[#818181]"
    }
  }
  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs font-semibold hover:opacity-75 hover:transition ${getVariantClasses()}`}
    >
      {children}
    </button>
  )
}

export default Button
