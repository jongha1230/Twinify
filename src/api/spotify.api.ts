class SpotifyAPI {
  private clientId: string;
  private clientSecret: string;
  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || "";
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  }

  async getAccessToken(): Promise<string> {
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const data = await response.json();
    return data.access_token;
  }
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
}

export default SpotifyAPI;
