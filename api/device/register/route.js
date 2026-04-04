export const runtime = "nodejs";

import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { device_name, sim_number, imei, owner_id, station_id, assigned_to_id } = await req.json();

    await sql`
      INSERT INTO devices (device_name, sim_number, imei, owner_id, station_id, assigned_to_id)
      VALUES (${device_name}, ${sim_number}, ${imei}, ${owner_id}, ${station_id}, ${assigned_to_id})
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Device Registration Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
