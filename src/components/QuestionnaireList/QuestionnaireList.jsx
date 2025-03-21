import QuestionnaireItem from "../QuestionnaireItem/QuestionnaireItem";

const QuestionnaireList = ({ questionnaires }) => {
  return (
    <ul>
      {questionnaires.map((questionnaire) => (
        <li key={questionnaire._id} className="card">
          <QuestionnaireItem questionnaire={questionnaire} />
        </li>
      ))}
    </ul>
  );
};

export default QuestionnaireList;
