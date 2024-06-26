import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { Link } from "react-router-dom";
const SurveyPage = () => {
  const [surveys, setSurvey] = useState([]);

  useEffect(() => {
    const handlesurvey = async (evt) => {
      evt.preventDefault();

      try {
        let res = await authApi.get(endpoints["load-survey"]);
        setSurvey(res.data)
      } catch (error) {
        console.log(error);
      }
    };
  },[]);

  return (
    <div>
        <h1>Các khảo sát</h1>
        <ul>
            {surveys.map(survey => (
                <li key={survey.surveyId}>
                    <Link to={`surveys/${survey.surveyId}/`}>{survey.surveyId}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default SurveyPage;
