"use server";

import { sql } from "@neondatabase/serverless";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password, role, parent_id } = await req.json();
    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, password_hash, role, parent_id)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${parent_id})
      RETURNING *
    `;

    return new Response(JSON.stringify({ success: true, user: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
