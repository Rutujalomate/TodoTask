import React, { useMemo, useState } from 'react'
const ExpensiveFunction=({num})=>{


const result=useMemo(()=>{
    console.log("calcu");

    return num*2
    },[num])
console.log("result",result);

return(
    <>
    <p>{result}</p>
    </>
)
}
const UseMemo = () => {
    const[count,setCount]=useState(0)
    const handleClick=()=>{
        setCount(count+1)
    }
  return (
    <div>
        <button onClick={handleClick}>count:{count}</button>
        <ExpensiveFunction num={5}/>
    </div>
  )
}

export default UseMemo