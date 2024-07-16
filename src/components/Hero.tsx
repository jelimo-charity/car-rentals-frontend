// import React from 'react'
import carhome from '../assets/carhome1.jpg'
const Hero = () => {
  return (
    <>
      <div className="hero bg-customBlueDarker min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse mr-30">
      <img
        src={carhome}
        className="max-w-md h-50 mt-30 rounded-sm shadow-2xl" />
      <div
      className="mr-10">
        <h1 className="text-5xl font-bold">We are changing <br />the way people <br />shop!</h1>
        <p className="py-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. <br />Ullam cupiditate labore adipisci temporibus, 
          consequatur dolorum cum animi tempora, <br />non ipsam aliquam fuga! Dolore facere laudantium 
          ipsum quibusdam at sit perferendis?
        </p>
        <button className="btn btn-primary">Products</button>
      </div>
    </div>
  </div>
        
    </>
  )
}

export default Hero
