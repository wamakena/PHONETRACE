import { sql } from "@neondatabase/serverless";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const users = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404 }
      );
    }

    const user = users[0];

    if (user.password !== password) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid password" }),
        { status: 401 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, user }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 }
    );
  }
}
