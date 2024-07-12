import api from "@/api/api";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await api.spotify.getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}