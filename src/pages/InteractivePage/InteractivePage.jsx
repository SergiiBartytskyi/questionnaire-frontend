import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  completeQuestionnaire,
  getQuestionnaireById,
} from "../../services/api";
import styles from "./InteractivePage.module.css";

const InteractivePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    async function fetchQuestionnaire() {
      const data = (await getQuestionnaireById(id)).data;
      setTitle(data.name);
      setDescription(data.description);
      setQuestions(data.questions);
      setStartTime(Date.now());
    }
    fetchQuestionnaire();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const completionTime = Math.floor((Date.now() - startTime) / 1000);

    await completeQuestionnaire({ id, answers, completionTime });
    navigate("/results");
  };

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <p>{description}</p>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={q._id} className={styles.wrapper}>
            <h3>
              {index + 1}. {q.questionText}
            </h3>

            {q.type === "text" && (
              <input
                type="text"
                onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                placeholder="Your answer..."
                required
              />
            )}

            {q.type === "single choice" &&
              q.options.map((option, optIndex) => (
                <label key={optIndex}>
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={option}
                    onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                  />
                  {option}
                </label>
              ))}

            {q.type === "multiple choices" &&
              q.options.map((option, optIndex) => (
                <label key={optIndex}>
                  <input
                    type="checkbox"
                    value={option}
                    onChange={(e) => {
                      const selected = answers[q._id] || [];
                      const updatedAnswers = e.target.checked
                        ? [...selected, option]
                        : selected.filter((ans) => ans !== option);
                      handleAnswerChange(q._id, updatedAnswers);
                    }}
                  />
                  {option}
                </label>
              ))}
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
    </div>
  );
};

export default InteractivePage;
