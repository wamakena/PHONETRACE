import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const devices = await sql`
      SELECT * FROM devices
      ORDER BY id DESC;
    `;

    return new Response(
      JSON.stringify({ devices }),
      { status: 200 }
    );

  } catch (err) {
    console.error("LIST DEVICES ERROR:", err);

    return new Response(
      JSON.stringify({
        error: "Failed to fetch devices",
        message: err.message,
      }),
      { status: 500 }
    );
  }
}
