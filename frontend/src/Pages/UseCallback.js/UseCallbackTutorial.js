import React, { useCallback, useMemo, useState } from 'react'
import Child from './Child'

const UseCallbackTutorial = () => {
    const[counter1,setCounter1]=useState(0)
    const[counter2,setCounter2]=useState(0)
    const handleIncrement=()=>{
        setCounter1(counter1+1)
    }
    const handleDecrement=()=>{
        setCounter2(counter2+1)
    }
    const func=useCallback(()=>{
        console.log("Hello rutuja")
        return'hjjk'
    },[counter2])
  
  return (
    <div>
        <Child counter2={"counter2"} func={func} />
        <button onClick={handleIncrement}>increment{counter1}</button>
        <button onClick={handleDecrement}>decrement{counter2}</button>

    </div>
  )
}

export default UseCallbackTutorial