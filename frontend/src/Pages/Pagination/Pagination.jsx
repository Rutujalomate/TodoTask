import React, { useEffect, useState } from 'react'
import ProductData from './ProductData'

const Pagination = () => {
    const [data,setData]=useState([])
    const[loadiing,setLoading]=useState(false)
    const[error,setError]=useState(false)
    const[currentPage,setCurrentPage]=useState(0)
    const fetchData=async()=>{
      setLoading(true)
      try {
        const res=await fetch('https://dummyjson.com/products')
        const result=await res.json()
        setData(result.products)
      } catch (error) {
        setError(true)
      }finally{
        setLoading(false)

      }
    }
console.log(data)
    
    useEffect(()=>{
        fetchData()
    },[])
    if(loadiing){
      return <>Loading...</>
    }
  const TotalResultsOnPage=10
  const TotalProducts=data.length
  const TotalPages=Math.ceil(TotalProducts/TotalResultsOnPage)
  const start=currentPage*TotalResultsOnPage
  const end=start+TotalResultsOnPage
  return (
    <div  >
      {
        !data.length?<>No Products in the cart</>:
        <div >
          <div style={{display:"flex",justifyContent:"center"}}>
            <button disabled={currentPage==0} onClick={()=>setCurrentPage(prev=>prev-1)}>-</button>
          {
            [...Array(TotalPages).keys()].map((n)=>{
              return <button style={{margin:"4px",backgroundColor:n==currentPage?"blue":""}} onClick={()=>setCurrentPage(n)} disabled={data.slice(start,end).length==0}>{n}</button>
            })
          }
            <button disabled={currentPage==TotalPages-1} onClick={()=>setCurrentPage(prev=>prev+1)}>+</button>

                  </div>

                  <ProductData data={data.slice(start,end)} />

        </div>
      }
    </div>
  )
}

export default Pagination