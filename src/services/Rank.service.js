const firebaseAPI =
  "https://lapsee-memory-game-default-rtdb.asia-southeast1.firebasedatabase.app/rank/";

class RankService {
  async loadRank(game) {
    const response = await fetch(firebaseAPI + game + ".json");
    const data = await response.json();
    return data;
  }
  async updateRank(newRank, game) {
    const response = await fetch(firebaseAPI + game + ".json", {
      method: "PUT",
      body: JSON.stringify(newRank),
    });
    const data = response.json();
    return data;
  }
}

export default new RankService();
