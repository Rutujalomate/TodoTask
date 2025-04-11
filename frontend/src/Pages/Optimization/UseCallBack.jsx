import React, { memo, useCallback } from 'react'
import { useState } from 'react'


const ExpensiveFunction=memo(({OnClick})=>{
    console.log("child compo rendered")
return(
    <>
    <button onClick={OnClick}>Click me!</button>
    </>
)
})

const UseCallBack = () => {
    const[count,setCount]=useState(0)
    const handleClick=()=>{
        setCount(count+1)
    }
    const OnClick=useCallback(()=>{
        console.log("button is clicked");
        
    },[])

  return (
    <div>
        <button onClick={handleClick}>count:{count}</button>
        <ExpensiveFunction OnClick={OnClick}/>
    </div>
  )
}

export default UseCallBack