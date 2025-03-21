import axios from "axios";

const API_URL = "http://localhost:3000/questionnaires";

export const fetchQuestionnaires = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createQuestionnaire = async (questionnaire) => {
  await axios.post(API_URL, questionnaire);
};

export const deleteQuestionnaire = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
