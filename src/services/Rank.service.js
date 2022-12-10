import axios from "axios";

// Firebase Functions
let functions_API = "https://asia-east1-lapsee-memory-game.cloudfunctions.net/";
if (window.location.hostname === "localhost") {
  functions_API = "http://127.0.0.1:5001/lapsee-memory-game/asia-east1/";
}

const RANK_API = functions_API + "api/rank/";
class RankService {
  getRank(game) {
    return axios.get(RANK_API + game);
  }
  postScore(game, name, score) {
    return axios.post(RANK_API + game, {
      name,
      score,
    });
  }
}

export default new RankService();
