"use server";

import { sql } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password, role, parent_id } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user
  await sql`
    INSERT INTO users (name, email, password_hash, role, parent_id)
    VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${parent_id})
  `;

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
