export const runtime = "nodejs"; // ensures Node runtime on Vercel

import { sql } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, role, parent_id } = await req.json();

    // Hash password with bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await sql`
      INSERT INTO users (name, email, password_hash, role, parent_id)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${parent_id})
    `;

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Register User Error:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
