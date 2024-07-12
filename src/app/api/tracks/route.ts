// import api from "@/api/api";
// import { NextResponse } from 'next/server';

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const offset = Number(searchParams.get('offset') || 0);
//   const limit = Number(searchParams.get('limit') || 10);

//   try {
//     const { tracks, nextOffset } = await api.spotify.getChartTracks(offset, limit);
//     return NextResponse.json({ tracks, nextOffset });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch tracks' }, { status: 500 });
//   }
// }