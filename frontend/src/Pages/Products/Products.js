import React, { useEffect, useState } from 'react'

export const Products = () => {
    const [data,setdata]=useState([])
    const [cartData,setcartData]=useState([])

    const fetchData=async ()=>{
         const res=await fetch("https://dummyjson.com/products")
         const json=await res.json()
         setdata(json.products)
    }
    console.log(data)

useEffect(()=>{
    fetchData()
},[])

const handleClick=(el,id)=>{
setcartData(...cartData,el)
}

  return (
    <div>
        {
            data&&data.map((el)=>{
                return <>
                <img src={el.thumbnail}/>
                <p>{el.title}</p>
                <button onClick={()=>handleClick(el,el.id)}>Add to cart</button>
                </>
            })
        }
    </div>
  )
}
