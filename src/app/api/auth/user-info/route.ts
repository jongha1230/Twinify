import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const {data: {user}} = await supabase.auth.getUser();

  if(!user) {
    return NextResponse.json({error: '인증 되지 않은 사용자'}, {status: 401})
  }

  const {data, error} = await supabase
    .from("users")
    .select("nickname, profileImg")
    .eq('id',user.id)
    .single()

  if(error) {
    return NextResponse.json({error: error.message}, {status: 500})
  }

  return NextResponse.json(data);
}