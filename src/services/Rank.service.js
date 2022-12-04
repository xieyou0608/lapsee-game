import axios from "axios";

// Firebase Functions
const RANK_API =
  "https://asia-east1-lapsee-memory-game.cloudfunctions.net/api/rank/";

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
