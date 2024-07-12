import { createClient } from "@/supabase/server";
import { Tables } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";

// 댓글 가져오기
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("trackId");
  const { data, error } = await createClient().from("comments").select("*").eq("trackId", id).order("createdAt", { ascending: false });

  if (error) {
    console.error("댓글을 가져오는 도중 에러발생:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 댓글 추가하기
export async function POST(request: NextRequest) {
  const data = await request.json();
  const { content, userId, trackId, createdAt }: Tables<"comments"> = data;
  const { error } = await createClient().from("comments").insert({
    content,
    userId,
    trackId,
    createdAt,
  });
  if (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 댓글 삭제하기
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const trackId = searchParams.get("trackId");
  if (!id || !trackId) {
    return NextResponse.json({ error: "id and trackId parameters are required" }, { status: 400 });
  }

  const { data, error } = await createClient().from("comments").delete().eq("id", id).eq("trackId", trackId);
  if (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// 댓글 수정하기
export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const trackId = searchParams.get("trackId");
  
  const { content } = await request.json();
  const { error } = await createClient().from("comments").update({ content }).eq("id", id).eq("trackId", trackId);
  if (error) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(content)
}
