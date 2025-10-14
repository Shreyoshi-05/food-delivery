import React from 'react'
import '../homeCss/hero.css'

const Hero = () => {
  return (
    <div className='hero'>
      {/* <div className="img">
        <img src="/hero.jpg" alt="" />
      </div> */}
      <div className="content">
        <h1>Order your fevourite food item</h1>
        <p>
          Discover delicious meals with TastyBite — explore restaurants, browse menus, and order your favorites effortlessly. Enjoy real-time tracking, personalized suggestions, and secure payments for a seamless food experience.
        </p>
        <button>order now</button>
      </div>
    </div>
  )
}

export default Hero