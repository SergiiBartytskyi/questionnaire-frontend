import { deleteQuestionnaire } from "../../services/api";

const QuestionnaireItem = ({ questionnaire }) => {
  const { _id, name, description, questions, completions } = questionnaire;

  const handleDelete = async (id) => {
    await deleteQuestionnaire(id);
  };

  return (
    <>
      <h3>{name}</h3>
      <p>{description || "No description provided."}</p>
      <p>
        <strong>Questions:</strong> {questions.length}
      </p>
      <p>
        <strong>Completions:</strong> {completions}
      </p>
      <button onClick={() => handleDelete(_id)}>Delete</button>
    </>
  );
};
export default QuestionnaireItem;
