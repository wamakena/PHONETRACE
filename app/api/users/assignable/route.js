"use server";

import { sql } from "@neondatabase/serverless";

export async function GET() {
  const owners = await sql`SELECT id, name, role FROM users WHERE role IN ('webhost','admin','partner_admin')`;
  const stations = await sql`SELECT id, name FROM users WHERE role = 'station_admin'`;
  const assignees = await sql`SELECT id, name, role FROM users WHERE role IN ('partner_user','minor','guardian')`;

  return new Response(JSON.stringify({ owners, stations, assignees }), { status: 200 });
}
