import AuthAPI from "./auth.api";
import LikesAPI from "./likes.api";
import SpotifyAPI from "./spotify.api";

class API {
  spotify: SpotifyAPI;
  likes: LikesAPI;
  auth: AuthAPI;

  constructor() {
    this.spotify = new SpotifyAPI();
    this.likes = new LikesAPI();
    this.auth = new AuthAPI();
  }
}

const api = new API();
export default api;
