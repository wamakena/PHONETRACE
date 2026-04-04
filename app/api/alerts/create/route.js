import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { device_id, device_name, message } = await req.json();
    if (!device_id || !message) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
    }

    const result = await sql`
      INSERT INTO alerts (device_id, device_name, message)
      VALUES (${device_id}, ${device_name}, ${message})
      RETURNING *
    `;

    return new Response(JSON.stringify({ success: true, alert: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
