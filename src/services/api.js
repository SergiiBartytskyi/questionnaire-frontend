import axios from "axios";

const API_URL = "http://localhost:3000/questionnaires";

export const fetchQuestionnaires = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export const getQuestionnaireById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createQuestionnaire = async (questionnaire) => {
  await axios.post(API_URL, questionnaire);
};

export const updateQuestionnaire = async (id, questionnaire) => {
  await axios.put(`${API_URL}/${id}`, questionnaire);
};

export const completeQuestionnaire = async ({
  id,
  answers,
  completionTime,
}) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/submit`, {
      answers,
      completionTime,
    });
    console.log("answers :>> ", answers);
    console.log("completionTime :>> ", completionTime);
    return response.data;
  } catch (error) {
    console.error("Error submitting questionnaire:", error);
    throw error;
  }
};

export const deleteQuestionnaire = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
