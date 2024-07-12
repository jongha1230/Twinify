let accessToken: string | null = null;
let tokenExpirationTime: number | null = null;
class SpotifyAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpirationTime: number | null = null;
  
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || "";
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  }
  // 토큰 받기
  async getAccessToken(): Promise<string | null> {
    if (this.accessToken && this.tokenExpirationTime && Date.now() < this.tokenExpirationTime) {
      return this.accessToken;
    }

    if (typeof window !== 'undefined') {
      const response = await fetch('/api/spotify-token');
      const data = await response.json();
      this.accessToken = data.token;
      this.tokenExpirationTime = Date.now() + 3600 * 1000; 
      if (!this.accessToken) {
        throw new Error("Failed to obtain access token");
      }
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

   const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpirationTime = Date.now() + data.expires_in * 1000;

    if (!this.accessToken) {
      throw new Error("Failed to obtain access token");
    }

    return this.accessToken;
  }
  // 플레이리스트 목록 불러오기
  async getChartTracks(
    offset: number = 0,
    limit: number = 10
  ): Promise<{
    tracks: SpotifyApi.TrackObjectFull[];
    nextOffset: number;
  }> {
    const access_token = await this.getAccessToken();
    const chartPlaylistId = "37i9dQZF1DXcBWIGoYBM5M"; // 인기순 플레이리스트
  
    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${chartPlaylistId}/tracks?fields=items(track(id,name,href,artists(id,name),album(id,name,images),duration_ms,popularity,preview_url))&limit=${limit}&offset=${offset}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
  
    const playlistData = await playlistResponse.json();
  
    const tracks: SpotifyApi.TrackObjectFull[] = playlistData.items.map((item: { track: SpotifyApi.TrackObjectFull }) => item.track);
  
    return { tracks, nextOffset: offset + limit };
  }
  
  

  // 메인 페이지에서 사용할 인기순 트랙 4개 불러오기
  async getTopChartTracks(limit: number = 4): Promise<{ tracks: SpotifyApi.TrackObjectFull[] }> {
    const access_token = await this.getAccessToken();
    const chartPlaylistId = "37i9dQZF1DXcBWIGoYBM5M";

    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${chartPlaylistId}/tracks?fields=items(track(id,name,href,artists(id,name),album(id,name,images),duration_ms,popularity,preview_url))&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      },
    );

    const playlistData = await playlistResponse.json();

    const tracks: SpotifyApi.TrackObjectFull[] = playlistData.items?.map((item: { track: SpotifyApi.TrackObjectFull }) => item.track);

    return { tracks };
  }

  // 검색 기능
  async searchTracks(
    query: string,
    offset: string = "0",
    limit: string = "10",
  ): Promise<{
    tracks: SpotifyApi.TrackObjectFull[];
    nextOffset: number;
  }> {
    const access_token = await this.getAccessToken();
    const encodedQuery = encodeURIComponent(query);

    const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const searchData = await searchResponse.json();

    const tracks: SpotifyApi.TrackObjectFull[] = searchData.tracks.items;

    return { tracks, nextOffset: Number(offset) + Number(limit) };
  }

  // 트랙 상세 정보
  async getTrackDetails(trackIds: string | string[]): Promise<SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectFull[]> {
    const access_token = await this.getAccessToken();

    const ids = Array.isArray(trackIds) ? trackIds.join(",") : trackIds;

    const response = await fetch(`https://api.spotify.com/v1/tracks?ids=${ids}`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = await response.json();
    return Array.isArray(trackIds) ? data.tracks : data.tracks[0];
  }
}

export default SpotifyAPI;
