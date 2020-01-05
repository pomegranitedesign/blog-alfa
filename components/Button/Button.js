import React from 'react'

const Button = props => {
  const { label, onClick, ...other } = props
  return (
    <>
      <button {...other} onClick={onClick} className="Button">
        {label}
      </button>
    </>
  )
}
export default Button
