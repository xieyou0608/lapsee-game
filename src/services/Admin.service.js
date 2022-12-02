import axios from "axios";

const questionsAPI =
  "https://lapsee-memory-game-default-rtdb.asia-southeast1.firebasedatabase.app/questions";

class AdminService {
  getQuestions() {
    return axios.get(questionsAPI + ".json");
  }

  // post format: question = { description, choices, answer }
  postQuestion(question) {
    return axios.post(questionsAPI + ".json", question);
  }

  putQuestions(questionsJson) {
    return axios.put(questionsAPI + ".json", questionsJson);
  }

  updateOneQuestion(id, updatedObject) {
    return axios.patch(questionsAPI + `/${id}.json`, updatedObject);
  }

  deleteQuestion(id) {
    return axios.delete(questionsAPI + `/${id}.json`);
  }

  deleteAllQuesiton() {
    return axios.delete(questionsAPI + ".json");
  }
}

export default new AdminService();
