// import QuestionnaireForm from "../../components/QuestionnaireForm/QuestionnaireForm";
// import styles from "./BuilderPage.module.css";

// const BuilderPage = () => {
//   return (
//     <section className={styles.section}>
//       <div className={styles.container}>
//         <h1>Create Quiz</h1>
//         <QuestionnaireForm />
//       </div>
//     </section>
//   );
// };

// export default BuilderPage;

import React, { useState } from "react";
import {
  TextField as Input,
  TextareaAutosize as Textarea,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Button from "../../components/ui/alert/Button";
import styles from "./BuilderPage.module.css";
import { createQuestionnaire } from "../../services/api";

const BuilderPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleDelete = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    // const questionnaireData = {
    //   name,
    //   description,
    //   questions,
    // };
    // // Send questionnaireData to the backend
    // console.log(questionnaireData);
    // // Example of sending data to the backend

    // fetch("/api/submit-questionnaire", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(questionnaireData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    const addQuestion = async () => {
      try {
        setError(null);
        setLoading(true);

        await createQuestionnaire({ name, description, questions });
        setName("");
        setDescription("");
        setQuestions([]);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error has occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    addQuestion();
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Questionnaire Builder</h1>
        <div className={styles.wrapper}>
          <label className={styles.label}>
            Name:
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </label>
        </div>
        <div className={styles.wrapper}>
          <label className={styles.label}>
            Description:
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
            />
          </label>
        </div>

        {questions.map((question, index) => (
          <div key={index} className={styles.answerWrapper}>
            <div className={styles.answerQuestion}>
              <label className={styles.label}>
                Question {index + 1}:
                <Input
                  type="text"
                  value={question.text}
                  onChange={(e) => updateQuestionText(index, e.target.value)}
                  className={styles.input}
                />
              </label>
            </div>
            <div className={styles.typeWrapper}>
              <label>Type:</label>
              <Select
                value={question.type}
                onChange={(e) => updateQuestionType(index, e.target.value)}
                className={styles.select}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="single choice">Single Choice</MenuItem>
                <MenuItem value="multiple choices">Multiple Choices</MenuItem>
              </Select>
              <Button
                onClick={() => handleDelete(index)}
                className={styles.btn}
              >
                Delete
              </Button>
            </div>

            {question.type === "single choice" && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={styles.answerQuestion}>
                    <RadioGroup>
                      <FormControlLabel
                        control={
                          <Radio
                            id={`radio-${optionIndex}`}
                            name={`question-${index}`}
                          />
                        }
                        label={
                          <Input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              updateOptionText(
                                index,
                                optionIndex,
                                e.target.value
                              )
                            }
                            className={styles.input}
                          />
                        }
                      />
                    </RadioGroup>
                  </div>
                ))}
                <Button onClick={() => addOption(index)} className={styles.btn}>
                  Add Option
                </Button>
              </div>
            )}
            {question.type === "multiple choices" && (
              <div>
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className={styles.answerQuestion}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id={`checkbox-${optionIndex}`}
                          name={`question-${index}`}
                        />
                      }
                      label={
                        <Input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            updateOptionText(index, optionIndex, e.target.value)
                          }
                          className={styles.input}
                        />
                      }
                    />
                  </div>
                ))}
                <Button onClick={() => addOption(index)} className={styles.btn}>
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
        <Button onClick={handleSubmit} className={styles.btn}>
          Submit Questionnaire
        </Button>
      </div>
    </section>
  );
};

export default BuilderPage;
