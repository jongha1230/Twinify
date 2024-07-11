class SpotifyService {
  async getAccessToken() {
    // Access token을 가져오는 로직
    return;
  }
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

export default SpotifyService;
