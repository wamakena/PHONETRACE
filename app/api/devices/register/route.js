import { sql } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { imei, model, owner_id } = body;

    if (!imei || !owner_id) {
      return new Response(
        JSON.stringify({ error: "imei and owner_id required" }),
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO devices (imei, model, owner_id)
      VALUES (${imei}, ${model || null}, ${owner_id})
      RETURNING *;
    `;

    return new Response(
      JSON.stringify({ device: result[0] }),
      { status: 200 }
    );

  } catch (err) {
    console.error("REGISTER DEVICE ERROR:", err);

    return new Response(
      JSON.stringify({
        error: "Failed to register device",
        message: err.message,
      }),
      { status: 500 }
    );
  }
}
