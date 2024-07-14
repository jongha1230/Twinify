import api from "@/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await api.spotify.getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch token' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await api.spotify.refreshToken();
    const token = await api.spotify.getAccessToken();
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to refresh token' }, { status: 500 });
  }
}