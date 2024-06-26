import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Apis, { endpoints } from "../../../configs/Apis";
import { MyUserContext } from "../../../App";

const SurveyResponseForm = () => {
  const { surveyId } = useParams;
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswer] = useState({});
  const [current_user] = useContext(MyUserContext);
  const [questions, setQuestion] = useState([]);

  useEffect(() => {
    const handleResponse = async (evt) => {
      evt.preventDefault();

      try {
        let res = await Apis.get(endpoints["load-question-survey"]);
        setQuestion(res.data);

        const initRes = {};
        res.data.foreach((question) => {
          initRes[question.id] = "";
        });
        setAnswer(initRes);
      } catch (error) {
        console.log(error);
      }
    };
  }, [surveyId]);

  const handleChange = (questionId, value) => {
    setReponses(
      ...(prevReponse) => ({
        ...prevReponse,
        [questionId]: value,
      })
    );
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    try {
      let res = Apis.post(endpoints["response-survey"], response);
    } catch (error) {
      console.log(error);
    }
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Phản hồi {survey.surveyId}</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id}>
            <label>{question.blank_space}</label>
            <input
              type="text"
              value={answers[question.id]}
              onChange={(e) => handleChange(question.id, e.target.value)}
            />
            <lable>Choices:</lable>
            {question.answers.map((answers) => (
              <div key={answers.id}>
                <input
                  type="radio"
                  id={answers.id}
                  name={question.id}
                  value={answers.choice}
                  checked={answers[question.id] === answers.choice}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
                <label htmlFor={answers.id}>{answers.content}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Gửi</button>
      </form>
    </div>
  );
};

export default SurveyResponseForm;
