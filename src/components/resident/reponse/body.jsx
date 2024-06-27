import { useEffect, useState } from "react";
import Apis, { authApi, endpoints } from "../../../configs/Apis";
import { Link } from "react-router-dom";
const SurveyPage = () => {
  const [surveys, setSurvey] = useState([]);

  useEffect(() => {
    const handlesurvey = async () => {

      try {
        let res = await Apis.get(endpoints["load-survey"]);
        setSurvey(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    handlesurvey();
  },[]);

  return (
    <div>
        <h1>Các khảo sát</h1>
        <ul>
            {surveys.map(survey => (
                <li key={survey.id}>
                    <Link to={`/survey/${survey.id}/`}>{survey.id}</Link>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default SurveyPage;
