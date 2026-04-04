import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
  try {
    const devices = await sql`
      SELECT * FROM devices
      ORDER BY created_at DESC;
    `;

    return Response.json({ devices });

  } catch (err) {
    console.error("LIST DEVICES ERROR:", err);
    return Response.json(
      { error: "Failed to fetch devices" },
      { status: 500 }
    );
  }
}
