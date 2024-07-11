import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";
  import { redirect } from "next/navigation";

export async function POST(requset: NextRequest) {
  const data = await requset.json();
  console.log(data)
  const password = data.password as string;
  const email = data.email as string;

  const supabase = createClient()
  const {data: {user}, error: signInError} = await supabase.auth.signInWithPassword({
    email,
    password,
    })
    if (signInError) {
      console.error('Supabase signIn error:', signInError);
      return NextResponse.json({ error: signInError.message }, { status: 400 });
    }
    if (!user) {
      console.warn('Supabase signIn returned null data');
      return NextResponse.json({ message: "Sign in process initiated, but no data returned" }, { status: 200 });
    }
    redirect("/")
    return NextResponse.json(user)
}
