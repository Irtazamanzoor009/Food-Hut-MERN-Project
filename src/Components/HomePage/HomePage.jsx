import React from 'react'
import Navbar from '../Navbar/Navbar'
import Products from '../Products/Products'
import Slider from '../Slider/Slider'

const HomePage = () => {
  return (
    <div>
        <Navbar/>
        <Slider/>
        <Products/>
    </div>  
  )
}

export default HomePage