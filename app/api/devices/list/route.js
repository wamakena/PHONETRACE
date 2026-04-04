import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const sql = getDB();

    const devices = await sql(
      "SELECT * FROM devices ORDER BY id DESC"
    );

    return NextResponse.json({
      success: true,
      devices,
      count: devices.length,
    });

  } catch (err) {
    console.error("LIST DEVICES ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch devices",
        message: err.message,
      },
      { status: 500 }
    );
  }
}
