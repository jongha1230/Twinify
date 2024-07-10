import LikesAPI from "./likes.api";
import SpotifyAPI from "./spotify.api";

class API {
  spotify: SpotifyAPI;
  likes: LikesAPI;

  constructor() {
    this.spotify = new SpotifyAPI();
    this.likes = new LikesAPI();
  }
}

const api = new API();
export default api;
