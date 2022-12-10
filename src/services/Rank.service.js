import axios from "axios";

// RTDB REST API
const RANK_REST_API =
  "https://lapsee-game-default-rtdb.asia-southeast1.firebasedatabase.app/rank/";

// Firebase Functions
let functions_API = "https://asia-east1-lapsee-game.cloudfunctions.net/api";
// if (window.location.hostname === "localhost") {
//   functions_API = "http://127.0.0.1:5001/lapsee-game/asia-east1/api";
// }

const RANK_API = functions_API + "/rank/";
class RankService {
  getRank(game) {
    return axios.get(RANK_REST_API + game + ".json");
  }
  postScore(game, name, score) {
    return axios.post(RANK_API + game, {
      name,
      score,
    });
  }
}

export default new RankService();
