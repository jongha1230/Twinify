import SpotifyAPI from "./spotify.api";

class API {
  spotify: SpotifyAPI;

  constructor() {
    this.spotify = new SpotifyAPI();
  }
}

const api = new API();
export default api;
