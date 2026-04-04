import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { user_id, parent_id } = await req.json();

    const result = await sql`
      UPDATE users
      SET parent_id = ${parent_id}
      WHERE id = ${user_id}
      RETURNING id, name, role, parent_id
    `;

    return new Response(JSON.stringify({ success: true, user: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
