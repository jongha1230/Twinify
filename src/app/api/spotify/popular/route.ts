import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const offset = searchParams.get("offset") || "0";
  const limit = "10";
  const access_token = request.headers.get("Authorization")?.split(" ")[1];
  if (!access_token) {
    return NextResponse.json({ error: "No access token provided" }, { status: 401 });
  }

  try {
    const chartPlaylistId = "37i9dQZF1DXcBWIGoYBM5M";
    const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${chartPlaylistId}/tracks?fields=items(track(id))&limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const playlistData = await playlistResponse.json();
    const trackIds = playlistData.items.map((item: any) => item.track.id).join(",");

    const tracksResponse = await fetch(`https://api.spotify.com/v1/tracks?ids=${trackIds}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const tracksData = await tracksResponse.json();

    const tracks = tracksData.tracks.map((track: any) => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map((artist: any) => ({
        id: artist.id,
        name: artist.name,
      })),
      album: {
        id: track.album.id,
        name: track.album.name,
        images: track.album.images,
      },
      duration_ms: track.duration_ms,
      popularity: track.popularity,
    }));

    return NextResponse.json({ tracks, nextOffset: Number(offset) + Number(limit) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}
