export const runtime = "nodejs";

import { sql } from "@neondatabase/serverless";

export async function GET() {
  try {
    const owners = await sql`SELECT id, name, role FROM users WHERE role IN ('webhost','admin','partner_admin')`;
    const stations = await sql`SELECT id, name FROM users WHERE role = 'station_admin'`;
    const assignees = await sql`SELECT id, name, role FROM users WHERE role IN ('partner_user','minor','guardian')`;

    return new Response(JSON.stringify({ owners, stations, assignees }), { status: 200 });
  } catch (err) {
    console.error("Assignable Users Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
