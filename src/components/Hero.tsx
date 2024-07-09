// import React from 'react'

const Hero = () => {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse mr-30">
      <img
        src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
        className="max-w-sm rounded-lg shadow-2xl" />
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
