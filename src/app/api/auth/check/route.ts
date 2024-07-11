import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient()
    const {data: {user}, error} = await supabase.auth.getUser()
    if(error || !user) {return NextResponse.json({error: "Unauthorized" }, { status: 401 })}

    console.log("check" ,user.user_metadata)
    
    return NextResponse.json({user: {
        id: user.id,
        email: user.email,
        user_metadata: user.user_metadata 
    }})
}