import axios from "axios";

// Firebase Functions
let functions_API = "https://asia-east1-lapsee-memory-game.cloudfunctions.net/";
// if (window.location.hostname === "localhost") {
//   functions_API = "http://127.0.0.1:5001/lapsee-memory-game/asia-east1/";
// }

const QUIZ_API = functions_API + "api/questions/random/";
const QUIZ_IO_API = functions_API + "api/onlineRoom/quiz/";

class QuizService {
  getRandomQuestions() {
    return axios.get(QUIZ_API);
  }

  postChosen(roomId, round, userId, option) {
    return axios.post(QUIZ_IO_API + `${roomId}/playerChosen/${round}`, {
      userId,
      chosen: option,
    });
  }

  checkRound(roomId) {
    return axios.patch(QUIZ_IO_API + roomId);
  }
}

export default new QuizService();
