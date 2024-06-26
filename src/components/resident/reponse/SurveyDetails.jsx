import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Apis, { endpoints } from "../../../configs/Apis";
import { FaRegFrownOpen } from "react-icons/fa";



const SurveyDetails = () => {
    const { surveyId } =  useParams()
    const [survey, setSurvey] = useState(null);

    useEffect(() => {
        const handleSurveyDetails = async (evt) => {
            try{
                let res = await Apis.get(endpoints['load-surveyform-by-id']);
                setSurvey(res.data);
            }
            catch(error){
                console.log(error);
            }
        };
    },[surveyId]);

    if(!survey){
        return <div>Hiện tại không có khảo sát<FaRegFrownOpen /></div>
    }

    return(
        <div>
            <h1>khảo sát </h1>
            <p>{survey.description}</p>
            <ul>
                {survey.question.map(question => (
                    <li key={question.questionId}>{question.contents}</li>
                ))}
            </ul>
            <Link to={`/respond/${survey.surveyId}`}>Trả lời câu hỏi</Link>
        </div>
    )
};

export default SurveyDetails;