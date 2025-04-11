import React from 'react'

const Promises = () => {
    var promise1=fetch('https://dummyjson.com/recipes/search?q=').then((res)=>res.json())
    var promise2=fetch('https://dummyjson.com/recipes/search?q=mango').then((res)=>res.json())
    var promise3=fetch('https://dummyjson.com/recipes/serch?q=').then((res)=>res.json())

    Promise.all([promise1,promise2,promise3]).then((res)=>console.log(res)).catch((e)=>console.log(e))
 
    return (
    <div>Promises</div>
  )
}

export default Promises