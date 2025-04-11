import React, { useMemo, useState } from 'react'

const Memo = () => {
    const[counter1,setCounter1]=useState(0)
    const[counter2,setCounter2]=useState(0)
    const handleIncrement=()=>{
        setCounter1(counter1+1)
    }
    const handleDecrement=()=>{
        setCounter2(counter2-1)

    }
   
    const isEven=useMemo(()=>{
        console.log("i am useMemo")
        return counter1%2===0

    },[counter1])

  return (
    <div>
        <button onClick={handleIncrement}>increment{counter1}{isEven}</button>
        <button onClick={handleDecrement}>Deecrement{counter2}</button>

    </div>
  )
}

export default Memo