import axios from "axios";

// Firebase Functions
const QUIZ_API =
  "https://asia-east1-lapsee-memory-game.cloudfunctions.net/api/questions/random";

class QuizService {
  getRandomQuestions() {
    return axios.get(QUIZ_API);
  }
}

export default new QuizService();
