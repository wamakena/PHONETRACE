import { sql } from "@neondatabase/serverless";

export async function GET() {
  try {
    const alerts = await sql`SELECT * FROM alerts ORDER BY created_at DESC LIMIT 50`;
    return new Response(JSON.stringify(alerts), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
