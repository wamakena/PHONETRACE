
import { NextResponse } from "next/server"

export async function POST(req){

const { imei } = await req.json()

if(!imei){
return NextResponse.json({status:"INVALID"})
}

return NextResponse.json({
status:"UNKNOWN"
})

}
