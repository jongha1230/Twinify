import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient()
    const {data: {user}} = await supabase.auth.getUser()
    
    if(!user) {
        // 로그인하지 않은 상태는 에러가 아니므로 204 상태를 반환
        return NextResponse.json({ message: "User not authenticated" }, { status: 204 });
    }
    
    return NextResponse.json({user})
}