import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if ((!supabaseUrl || !supabaseKey) && process.env.NODE_ENV !== "production") {
  console.warn("Supabase env vars are missing!");
}

export const supabase = createClient(supabaseUrl || "", supabaseKey || "");
