import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const connectionString = process.env.DATABASE_URL;

    // 🔍 DEBUG 1: Check env
    console.log("DB URL exists:", !!connectionString);

    if (!connectionString) {
      throw new Error("DATABASE_URL is missing");
    }

    const sql = neon(connectionString);

    // 🔍 DEBUG 2: Raw query (more stable)
    const devices = await sql(
      "SELECT * FROM devices ORDER BY created_at DESC"
    );

    // 🔍 DEBUG 3: Check result
    console.log("Devices fetched:", devices.length);

    return NextResponse.json({ devices });

  } catch (err) {
    console.error("❌ FULL ERROR:", err);

    return NextResponse.json(
      {
        error: "Failed to fetch devices",
        message: err.message,
        hint: "Check logs in Vercel → Functions",
      },
      { status: 500 }
    );
  }
}
