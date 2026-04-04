import { neon } from "@neondatabase/serverless";

export const runtime = "nodejs";

const sql = neon(process.env.DATABASE_URL);

export async function POST(req) {
  try {
    const body = await req.json();
    const { imei, model, owner_id } = body;

    if (!imei || !owner_id) {
      return Response.json(
        { error: "IMEI and owner_id are required" },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO devices (imei, model, owner_id, status, created_at)
      VALUES (${imei}, ${model || null}, ${owner_id}, 'active', NOW())
      RETURNING *;
    `;

    return Response.json({ success: true, device: result[0] });

  } catch (err) {
    console.error("REGISTER DEVICE ERROR:", err);
    return Response.json(
      { error: "Failed to register device" },
      { status: 500 }
    );
  }
}
