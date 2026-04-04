export const runtime = "nodejs";

import { sql } from "@neondatabase/serverless";

export async function GET(req) {
  try {
    // Optional: filter by user role via query
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    let devices;
    if (userId) {
      devices = await sql`
        SELECT d.*, u.name as owner_name
        FROM devices d
        LEFT JOIN users u ON d.owner_id = u.id
        WHERE d.assigned_to_id = ${userId} OR d.owner_id = ${userId}
      `;
    } else {
      devices = await sql`
        SELECT d.*, u.name as owner_name
        FROM devices d
        LEFT JOIN users u ON d.owner_id = u.id
      `;
    }

    return new Response(JSON.stringify(devices), { status: 200 });
  } catch (err) {
    console.error("Devices List Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
