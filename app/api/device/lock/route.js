import { sql } from '@neondatabase/serverless';

export async function POST(req) {
  const { device_id } = await req.json();

  await sql`UPDATE devices SET status = 'locked', last_alert = NOW() WHERE id = ${device_id}`;

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
