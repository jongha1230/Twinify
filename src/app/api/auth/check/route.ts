import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.getUser()

        if (error && error.message === "Auth session missing!") {
            // 사용자가 로그인하지 않은 상태
            return new Response(null, { status: 204 });
        }

        if (error) {
            console.error("Supabase auth error:", error);
            return NextResponse.json({ error: error.message }, { status: 401 });
        }

        // 사용자가 로그인한 상태
        return NextResponse.json({ user: data.user })
    } catch (error) {
        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}