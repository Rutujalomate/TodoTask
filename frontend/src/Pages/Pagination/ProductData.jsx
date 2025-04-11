import React from 'react'

const ProductData = ({data}) => {
  return (
    <div style={{"border":"1px solid red",display:"flex",justifyContent:"center",flexWrap:"wrap"}} >
        {
            data&&data.length&&data.map((el)=>{
                return <>
                <div style={{"border":"1px solid red",margin:"5px",display:"flex",justifyItems:"center",flexDirection:"column",flexWrap:"wrap",width:"250px"}} >
                    <img src={el.thumbnail} width={"250px"} />
                    <text>{el.title}</text>


                </div>
                </>
            })
        }
    </div>
  )
}

export default ProductData