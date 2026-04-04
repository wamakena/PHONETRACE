import { sql } from "@neondatabase/serverless";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const parentId = url.searchParams.get("parent_id");

    const users = parentId
      ? await sql`SELECT * FROM users WHERE parent_id = ${parentId}`
      : await sql`SELECT * FROM users`;

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
