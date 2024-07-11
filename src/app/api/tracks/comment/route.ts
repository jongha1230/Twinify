import { createClient } from "@/supabase/server";
import { Tables } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("trackId");
  const { data, error } = await createClient().from("comments").select("*").eq("trackId", id).order("createdAt", { ascending: false });

  if (error) {
    console.error("에러발생 ====>", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "No data found" }, { status: 404 });
  }
  const comments = data.map(comment => ({
    ...comment,
    createdAt: new Date(comment.createdAt).toISOString().slice(0, 10),
  }));
  return NextResponse.json(comments);
}

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

export async function PATCH(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  
  const { content } = await request.json();
  const { error } = await createClient().from("comments").update({ content }).eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return;
}
