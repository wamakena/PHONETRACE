import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      console.error("Missing DATABASE_URL");
      return NextResponse.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    const sql = neon(process.env.DATABASE_URL);

    const devices = await sql`
      SELECT * FROM devices
      ORDER BY created_at DESC;
    `;

    return NextResponse.json({ devices });

  } catch (err) {
    console.error("LIST DEVICES ERROR:", err);

    return NextResponse.json(
      {
        error: "Failed to fetch devices",
        details: err.message, // 👈 helps debugging
      },
      { status: 500 }
    );
  }
}
