// import React from 'react'
import { useNavigate } from 'react-router-dom'
import carhome from '../assets/carhome1.jpg'

const Hero = () => {
  const navigate = useNavigate()
  const getStarted = () => {
    navigate('/login')
  }
  return (
    <>
<div
  className="hero min-h-screen"
  style={{
    backgroundImage: "url("+ carhome +")",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-customBlueDarkest">BlaZe Car Rentals</h1>
      {/* <h2 className=' text-xl text-white'> Welcome to <span className='text-2xl text-customBlue'>BlaZe</span> Car Rentals!</h2> */}

      <p className="mb-5 text-customBlueLight text-xl">
      
Our mission is simple: to make your journey memorable by offering reliable and well-maintained vehicles. 
      </p>
      <button className="btn  bg-customBlueDarkest text-customBlueLight" onClick={getStarted}>Explore BlaZe </button>
    </div>
  </div>
</div>
        
    </>
  )
}

export default Hero
