import { sql } from "@neondatabase/serverless";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const assignedTo = url.searchParams.get("assigned_to_id"); // filter by user
    const owner = url.searchParams.get("owner_id"); // filter by webhost/admin

    const devices = assignedTo
      ? await sql`SELECT * FROM devices WHERE assigned_to_id = ${assignedTo}`
      : owner
      ? await sql`SELECT * FROM devices WHERE owner_id = ${owner}`
      : await sql`SELECT * FROM devices`;

    return new Response(JSON.stringify(devices), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
