import React, { useState } from 'react'

const Form = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [address,setaddress]=useState("")
    const [phoneNumber,setphoneNumber]=useState("")
    const [tab,setTab]=useState('profile')

    const [count,setCount]=useState(0)

    const handleSubmit=()=>{
console.log(name,email)
    }
    const handleCount=()=>{
        setCount(count+1)
    }
    console.log(count)
  return (
    <div>
       {/* {
        count==0?
       (<form onSubmit={handleSubmit}>
            <input placeholder='name' type='text' onChange={(e)=>setName(e.target.value)}/>
            <input placeholder='email' type='email' onChange={(e)=>setEmail(e.target.value)}/>

        </form>):count==1?<Form2 setphoneNumber={setphoneNumber} setaddress={setaddress} />:""}
        <button onClick={handleCount}>Next</button> */}
        <flex style={{flexDirection:"row"}}>
            <button onClick={()=>setTab("profile")}>Profile</button>
            <button onClick={()=>setTab("interest")}>Interest</button>
            <button onClick={()=>setTab("setting")}>setting</button>

        </flex>
{
tab=='profile'?<Profile/>:tab=="interest"?<Interest/>:tab=="setting"?<Setting/>:""
}
    </div>
  )
}
const Profile=({setphoneNumber,setaddress})=>{
    return (<form >profile
            <input placeholder='address' type='text' onChange={(e)=>setaddress(e.target.value)}/>
            <input placeholder='Phone' type='tel' onChange={(e)=>setphoneNumber(e.target.value)}/>

        </form>)
}
const Interest=({setphoneNumber,setaddress})=>{
    return (<form >interest
            <input placeholder='address' type='text' onChange={(e)=>setaddress(e.target.value)}/>
            <input placeholder='Phone' type='tel' onChange={(e)=>setphoneNumber(e.target.value)}/>

        </form>)
}
const Setting=({setphoneNumber,setaddress})=>{
    return (<form >setting
            <input placeholder='address' type='text' onChange={(e)=>setaddress(e.target.value)}/>
            <input placeholder='Phone' type='tel' onChange={(e)=>setphoneNumber(e.target.value)}/>

        </form>)
}
export default Form