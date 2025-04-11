import React, { memo } from 'react'
import { useState } from 'react'

const ExpensiveFunction=memo(({num})=>{
  console.log(num)
return(
<p>{num}</p>
)
})

const Reactmemo = () => {
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

export default Reactmemo