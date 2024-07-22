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
      <h1 className="mb-5 text-5xl font-bold text-customBlueDarkest">Speedy Car Rentals</h1>
      <p className="mb-5 text-customBlueLight">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn  bg-customBlueDarkest" onClick={getStarted}>Get Started</button>
    </div>
  </div>
</div>
        
    </>
  )
}

export default Hero
