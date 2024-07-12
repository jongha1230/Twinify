import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data: userLikes, error } = await supabase.from("likes").select("*").eq("userId", userId);

    if (error) throw error;

    console.log("흠", userLikes);
    return NextResponse.json({ userLikes });
  } catch (error) {
    console.error("Error fetching likes:", error);
    return NextResponse.json({ error: "Failed to fetch likes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { userId, trackId } = await request.json();

  if (!userId || !trackId) {
    return NextResponse.json({ error: "userId and trackId are required" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase.from("likes").insert({ userId, trackId }).select();

    if (error) throw error;

    return NextResponse.json({ message: "Like added successfully", like: data[0] });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json({ error: "Failed to add like" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const trackId = searchParams.get("trackId");

  if (!userId || !trackId) {
    return NextResponse.json({ error: "userId and trackId are required" }, { status: 400 });
  }

  const supabase = createClient();
  console.log("지워", userId, trackId);
  try {
    const { error } = await supabase.from("likes").delete().eq("userId", userId).eq("trackId", trackId);

    if (error) throw error;

    return NextResponse.json({ message: "Like removed successfully" });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json({ error: "Failed to remove like" }, { status: 500 });
  }
}
