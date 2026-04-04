
export default function Mobile(){

return(
<div style={{maxWidth:"420px",margin:"auto",padding:"20px"}}>

<h2>SIMTRACE Mobile</h2>

<button style={btn}>Register Device</button>
<button style={btn}>Live Tracking</button>
<button style={btn}>Emergency SOS</button>
<button style={btn}>Fraud Protection</button>

</div>
)
}

const btn={
width:"100%",
padding:"15px",
margin:"10px 0",
background:"#0A66FF",
color:"white",
border:"none"
}
