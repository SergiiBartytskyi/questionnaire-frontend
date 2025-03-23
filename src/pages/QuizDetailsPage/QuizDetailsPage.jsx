import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionnaireById, updateQuestionnaire } from "../../services/api";
import styles from "./QuizDetailsPage.module.css";
import Button from "../../components/ui/alert/Button";
import {
  Checkbox,
  FormControlLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";

const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestionnaire() {
      const data = (await getQuestionnaireById(id)).data;
      setTitle(data.name);
      setDescription(data.description);
      setQuestions(data.questions);
    }
    fetchQuestionnaire();
  }, [id]);

  const addQuestion = () => {
    const newQuestion = {
      type: "text",
      questionText: "",
      options: [],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    if (type === "text") {
      updatedQuestions[index].options = [];
    } else if (type === "single choice") {
      updatedQuestions[index].options = [""];
    } else if (type === "multiple choices") {
      updatedQuestions[index].options = [""];
    }
    setQuestions(updatedQuestions);
  };

  const updateQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].questionText = text;
    setQuestions(updatedQuestions);
  };

  const updateOptionText = (questionIndex, optionIndex, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = text;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { name: title, description, questions };
    console.log("updatedData :>> ", updatedData);
    await updateQuestionnaire(id, updatedData);
    navigate("/catalog");
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Edit Questionnaire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Questionnaire Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Questionnaire Description"
          />

          {questions.map((q, qIndex) => (
            <div key={qIndex} className={styles.answerWrapper}>
              <h3>Question {qIndex + 1}</h3>
              <input
                type="text"
                value={q.questionText}
                onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                placeholder="Enter your question"
                required
              />

              <Select
                value={q.type}
                onChange={(e) => updateQuestionType(qIndex, e.target.value)}
                // className={styles.select}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="single choice">Single Choice</MenuItem>
                <MenuItem value="multiple choices">Multiple Choices</MenuItem>
              </Select>

              <Button
                onClick={() => handleDelete(qIndex)}
                type="button"
                className={styles.btn}
              >
                Delete
              </Button>

              {q.type !== "text" && (
                <div>
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={option}
                      onChange={(e) =>
                        updateOptionText(qIndex, oIndex, e.target.value)
                      }
                      placeholder={`Option ${oIndex + 1}`}
                      required
                    />
                  ))}
                  <Button
                    onClick={() => addOption(qIndex)}
                    className={styles.btn}
                  >
                    Add Option
                  </Button>
                </div>
              )}
            </div>
          ))}

          <div className={styles.wrapper}>
            <Button onClick={addQuestion} className={styles.btn}>
              Add Question
            </Button>
          </div>
          <button type="submit">Update Questionnaire</button>
        </form>
      </div>
    </section>
  );
};
export default QuizDetailsPage;
