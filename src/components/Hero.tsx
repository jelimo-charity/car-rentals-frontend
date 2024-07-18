// import React from 'react'
import carhome from '../assets/carhome1r.png'
// import carhome2 from '../assets/carhome2r.png'

const Hero = () => {
  return (
    <>
 <div className=" bg-customBlueDarker ">
    <div className=" flex-col lg:flex-col ">
      <div className='flex flex-row '>
      <img
        src={carhome}
        className="max-w-sm h-25 ml-20 rounded-sm " />
          <img
        src={carhome}
        className="max-w-sm h-25 ml-30  rounded-sm " />
         <img
        src={carhome}
        className="max-w-sm h-25 ml-30  rounded-sm " />
      </div>
      <div
      className="flex flex-col  justify-items-center items-center mt-0">
        <h1 className="text-5xl font-bold">We are changing the way people ride!</h1>
        <p className="py-6">
        Welcome to Speedy Car Rentals.Your Journey begins Here!
        </p>
        <button className="btn btn-primary mb-10 w-200">Our rental cars</button>
      </div>
    </div>
  </div>
        
    </>
  )
}

export default Hero
