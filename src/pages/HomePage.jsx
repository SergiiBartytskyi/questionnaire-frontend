import { useEffect, useState } from "react";
import QuestionnaireList from "../components/QuestionnaireList/QuestionnaireList";
import Loader from "../components/Loader/Loader";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { fetchQuestionnaires } from "../services/api";

const HomePage = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getQuestionnaires = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = (await fetchQuestionnaires()).data;
        console.log("data :>> ", data);
        setQuestionnaires(data);
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

    getQuestionnaires();
  }, []);

  if (loading) return <Loader />;
  console.log("questionnaires :>> ", questionnaires);
  return (
    <section>
      <h1>Questionnaire List</h1>
      {!loading && <QuestionnaireList questionnaires={questionnaires} />}
      {error && <ErrorMessage message={error} />}
    </section>
  );
};

export default HomePage;
