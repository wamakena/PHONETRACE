
export default function Landing(){

return(
<div style={{fontFamily:"Arial"}}>

<header style={{background:"#0A66FF",color:"white",padding:"30px"}}>
<h1>SIMTRACE</h1>
<p>Your Phone. Our Intelligence.</p>
</header>

<section style={{padding:"40px"}}>
<h2>Global Phone Protection Network</h2>
<p>
SIMTRACE protects phones from theft, fraud, SIM swap attacks and enables
global recovery through community, telecom and police partnerships.
</p>
</section>

<section style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"20px",padding:"40px"}}>

<div>
<h3>Track Devices</h3>
<p>Live global tracking when devices are stolen.</p>
</div>

<div>
<h3>Emergency Protection</h3>
<p>Send SOS alerts to trusted contacts and authorities.</p>
</div>

<div>
<h3>Fraud Protection</h3>
<p>Detect SIM swaps and mobile banking attacks.</p>
</div>

</section>

<section style={{padding:"40px"}}>
<h2>Public IMEI Check</h2>
<a href="/registry">Check if a phone is stolen</a>
</section>

<footer style={{background:"#111",color:"white",padding:"20px"}}>
SIMTRACE © 2026
</footer>

</div>
)
}
