import QuestionnaireItem from "../QuestionnaireItem/QuestionnaireItem";
import styles from "./QuestionnaireList.module.css";

const QuestionnaireList = ({ questionnaires }) => {
  return (
    <ul className={styles.list}>
      {questionnaires.map((questionnaire) => (
        <li key={questionnaire._id} className={styles.item}>
          <QuestionnaireItem questionnaire={questionnaire} />
        </li>
      ))}
    </ul>
  );
};

export default QuestionnaireList;
