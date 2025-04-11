import React, { useEffect, useState } from 'react'

const AutoComplete = () => {
    const[data,setData]=useState([])
    const [input,setInput]=useState('')
    const[loading,setLoading]=useState(false)
    const[showResults,setshowResults]=useState(false)
    const[error,setError]=useState(false)

const [cacheData,setcacheData]=useState({})
    const fetchData=async()=>{
        console.log("123",cacheData[input])

        setLoading(true)
        if(cacheData[input]){
            console.log("cashed value")
            setData(cacheData[input])
            return 
        }
        try{
            const res=await fetch(`https://dummyjson.com/recipes/search?q=${input}`)
            const json=await res.json()
            setcacheData((prev)=>({...prev,[input]:json.recipes}))
            setData(json.recipes)
        }catch(e){
            setError(true)
        }finally{
            setLoading(false)

        }
        
    }
    useEffect(()=>{

       let timer=setTimeout(fetchData,400) 
       return ()=>clearTimeout(timer)
    },[input])
  return (
    <div >
        <input 
        onChange={(e)=>setInput(e.target.value)}
         onFocus={()=>setshowResults(true)}
         onBlur={()=>setshowResults(false)}

        />
        {showResults&&<div style={{height:"300px",border:"1px solid black",overflow:"scroll"}}>
            {
                data&&data.map((r)=><span key={r.id} style={{"display":"block"}}>{r.name}</span>)
            }
        </div>}
    </div>
  )
}

export default AutoComplete