import React, { useEffect, useState } from 'react'

const StopWatch = () => {
    const[count,setCount]=useState(0)
    const[isStart,setisStart]=useState(false)

    const handleClickStart=()=>{
        setisStart(true)
    }
    const handleClickPause=()=>{
        setisStart(false)

    }
     const handleClickReset=()=>{
        setCount(0)
        setisStart(false)

    }
useEffect(()=>{
    let timer=null
if(isStart){
    timer=setInterval(()=>{
        setCount((count1)=>count1+1)

    },1000)
}
else{
    clearInterval(timer)
}
return () => {
    clearInterval(timer);
  };
},[isStart])
  return (
    <div>
        <h3>{count}</h3>
        <button onClick={handleClickStart}>start</button>
        <button onClick={handleClickPause}>pause</button>
        <button onClick={handleClickReset}>reset</button>

    </div>
  )
}

export default StopWatch