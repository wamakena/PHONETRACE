"use server";

import { sql } from "@neondatabase/serverless";

export async function GET() {
  const users = await sql`
    SELECT u.id, u.name, u.email, u.role, p.name AS parent_name
    FROM users u
    LEFT JOIN users p ON u.parent_id = p.id
    ORDER BY u.created_at DESC
  `;

  return new Response(JSON.stringify(users), { status: 200 });
}
