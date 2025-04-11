import React from 'react'

const JsQuestionsFile = () => {
    //pass by value and pass by reference
    function getData(x,brr){
     x=10
     brr.push(4)
    }
    var a=20
    var arr=[1,2,3]
    getData(a,arr)
    console.log(a,arr)
///call apply bind 
function getInfo(a){
console.log( this.name+"loves"+this.hobby+"a"+a);
}
const obj={
    "name":"Rutuja",
    "hobby":"singing"
}
getInfo.call(obj,"song")
getInfo.apply(obj,["play"])
var myBind=getInfo.bind(obj,["room"])
console.log(myBind())
///clouser
function outer(b){
    var count=0
    return {

    
    increment :function(){
count++
console.log(count)
    },
    decrement :function(){
        count--
        console.log(count)

            },
        getCount:function(){
return count
        }    

    }
}
var counter=outer()
console.log(counter.increment())
console.log(counter.increment())

console.log(counter.decrement())
console.log(counter.getCount())

return (
    <div>JsQuestionsFile</div>
  )
}

export default JsQuestionsFile