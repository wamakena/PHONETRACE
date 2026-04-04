"use server";

import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  const { device_name, sim_number, imei, owner_id, station_id, assigned_to_id } = await req.json();

  await sql`
    INSERT INTO devices (device_name, sim_number, imei, owner_id, station_id, assigned_to_id)
    VALUES (${device_name}, ${sim_number}, ${imei}, ${owner_id}, ${station_id}, ${assigned_to_id})
  `;

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
