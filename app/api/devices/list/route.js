import { supabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
