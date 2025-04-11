import React, { useState } from 'react'

const Carousel = ({images}) => {
    const[imgIndex,setImageIndex]=useState(0)
    const handleButtonClickPrev=()=>{
        setImageIndex((prev)=>prev==0?images.length-1:prev-1)

    }
    const handleButtonClickNext=()=>{
        setImageIndex((prev)=>prev==images.length-1?0:prev+1)

    }

  return (
    <div>
        <button onClick={handleButtonClickPrev}>prev</button>
        <img src={images[imgIndex]}/>
        <button onClick={handleButtonClickNext}>Next</button>

    </div>
  )
}

export default Carousel