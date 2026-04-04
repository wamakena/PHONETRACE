
"use client"
import { useState } from "react"

export default function Registry(){

const [imei,setImei]=useState("")
const [result,setResult]=useState("")

async function check(){

const res = await fetch("/api/imei/check",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({imei})
})

const data = await res.json()
setResult(data.status)

}

return(

<div style={{padding:"40px"}}>

<h2>Global IMEI Registry</h2>

<input placeholder="Enter IMEI" onChange={(e)=>setImei(e.target.value)} />

<button onClick={check}>Check</button>

<p>Status: {result}</p>

</div>

)

}
