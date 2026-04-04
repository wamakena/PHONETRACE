import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const sql = getDB();
    const body = await req.json();

    const { imei, model, owner_id } = body;

    if (!imei || !owner_id) {
      return NextResponse.json(
        { success: false, error: "imei and owner_id required" },
        { status: 400 }
      );
    }

    const result = await sql(
      `
      INSERT INTO devices (imei, model, owner_id)
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
      [imei, model || null, owner_id]
    );

    return NextResponse.json({
      success: true,
      device: result[0],
    });

  } catch (err) {
    console.error("REGISTER DEVICE ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to register device",
        message: err.message,
      },
      { status: 500 }
    );
  }
}
