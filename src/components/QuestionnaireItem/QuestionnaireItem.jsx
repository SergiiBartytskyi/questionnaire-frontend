import { NavLink } from "react-router-dom";
import { deleteQuestionnaire } from "../../services/api";
import styles from "./QuestionnaireItem.module.css";

const QuestionnaireItem = ({ questionnaire }) => {
  console.log("questionnaires :>> ", questionnaire);
  const { _id, name, description, questions, completions } = questionnaire;
  const handleDelete = async (id) => {
    await deleteQuestionnaire(id);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{name}</h3>

      <p>{description || "No description provided."}</p>
      <div className={styles.statistic}>
        <p>
          <strong>Questions:</strong> {questions.length}
        </p>
        <p>
          <strong>Completions:</strong> {completions.length}
        </p>
      </div>

      <div className={styles.btnWrapper}>
        <NavLink to={`/take/${_id}`} className={styles.btn}>
          Run
        </NavLink>
        <NavLink to={`/edit/${_id}`} className={styles.btn}>
          Edit
        </NavLink>
        <button onClick={() => handleDelete(_id)} className={styles.btn}>
          Delete
        </button>
      </div>
    </div>
  );
};
export default QuestionnaireItem;
