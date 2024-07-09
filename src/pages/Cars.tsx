 // import React from 'react'

import { useState } from "react"

const Cars = () => {
    const [file, setFile] = useState("")

    const handleChange = (e: any) =>{
    //    console.log(e.target.files)
     
    }
    const handleSubmit = (e: any) => {
       console.log(e.target.files)

    }
  return (
    <>
    <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="fileInput">Upload car image here</label>
        <input type="file"  id="fileInput" onChange={e => handleChange(e)} required
        accept="image/png, image/jpeg, image/jpg, image/jfif"/>
        <button>submit</button>
    </form>
    </>
  )
}

export default Cars
