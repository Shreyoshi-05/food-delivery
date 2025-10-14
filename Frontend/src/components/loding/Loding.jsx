import React from 'react'
import './Loding.css'

const Loding = () => {
  return (
    <div className="loading-container">
      <div className="spinner">
        <div className="spinner-inner"></div>
      </div>
      <h2 className="loading-text">Cooking up something delicious...</h2>
      <p className="loading-subtext">Please wait while we prepare your order 🍴</p>
    </div>
  )
}

export default Loding