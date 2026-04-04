import { sql } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, role, parent_id } = await req.json();

    if (!name || !email || !password || !role) {
      return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await sql`
      INSERT INTO users (name, email, password_hash, role, parent_id)
      VALUES (${name}, ${email}, ${hashedPassword}, ${role}, ${parent_id})
      RETURNING id, name, email, role, parent_id
    `;

    return new Response(JSON.stringify({ success: true, user: result[0] }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
