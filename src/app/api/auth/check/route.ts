import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    if(error || !user) {return NextResponse.json({error: "Unauthorized" }, { status: 401 })}
    
    return NextResponse.json({user})
}