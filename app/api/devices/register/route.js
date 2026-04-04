import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { device_name, sim_number, owner_id, assigned_to_id } = await req.json();
    if (!device_name || !sim_number || !owner_id) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
    }

    const result = await sql`
      INSERT INTO devices (device_name, sim_number, owner_id, assigned_to_id)
      VALUES (${device_name}, ${sim_number}, ${owner_id}, ${assigned_to_id})
      RETURNING *
    `;

    return new Response(JSON.stringify({ success: true, device: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
