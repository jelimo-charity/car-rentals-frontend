// import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const auth = useSelector((state: RootState)=> state.auth)
  console.log(auth)
  return (
    <>
 <div className="navbar  bg-customBlueDarkest flex justify-between">
  <div className="flex-1 ml-16">
    <a className="btn btn-ghost text-xl">Speedy Cars</a>
  </div>
  <div>
  <ul tabIndex={0} className="flex flex-row bg-customBlueDarkest mr-10 rounded-box z-[1]  p-2 shadow">
    <li className="mr-2"><Link to="/">Home</Link></li>
    <li className="mr-2"><Link to="about">About</Link></li>
    <li className="mr-2"><Link to="cars">Cars</Link></li>
    {
      auth.user && (
        <li className="mr-2"><Link to={auth.user.role === 'admin' ? '/admindash' : '/userdash'}>Dashboard</Link></li>
      )
    }


</ul>
</div>
  <div className="flex-none">
    <ul>
    <li className="mr-2"><Link to="register">Create account</Link></li>
    <li className="mr-2"><Link to="login">Sign in</Link></li>

    </ul>
  </div>
</div>
      
    </>
  )
}

export default Navbar
