import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const password = data.password as string;
  const email = data.email as string;

  const supabase = createClient()
  const {data: {user}, error: signInError} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (signInError) {
    return NextResponse.json({ status: 'error', message: signInError.message }, { status: 400 });
  }
  if (!user) {
    return NextResponse.json({ status: 'success', message: "Sign in process initiated, but no data returned" }, { status: 200 });
  }

  return NextResponse.json({ status: 'success', user }, { status: 200 });
}