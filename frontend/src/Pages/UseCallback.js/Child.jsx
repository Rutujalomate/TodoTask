import React, { memo } from 'react'

const Child = ({counter2,func}) => {
    console.log("i am child element",func)
  return (
    <div>Child</div>
  )
}

export default Child