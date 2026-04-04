import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { device_id, lat, lng, is_active, alert_triggered } = await req.json();

    const result = await sql`
      UPDATE devices
      SET lat = ${lat}, lng = ${lng}, is_active = ${is_active}, alert_triggered = ${alert_triggered}
      WHERE id = ${device_id}
      RETURNING *
    `;

    return new Response(JSON.stringify({ success: true, device: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
