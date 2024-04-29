import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Apis, { endpoints } from "../../../configs/Apis";
import './body.css'

const AddSurvey = () => {
    const [loading, setLoading] = useState(false);
    
    const [survey, setSurvey] = useState({
        "surveyName": "",
        "description": "",
        "question": "",
        "options": ""
    });

    const changeSurvey = (evt, field) => {
        setSurvey(current => {
            return { ...current, [field]: evt.target.value }
        });
    };

    const addSurvey = async (evt) => {
        evt.preventDefault();

        try {
            let res = await Apis.post(endpoints['admin-add-survey'], survey);
            if (res.status === 200) {
                toast.success(res.data);
                // Reset form after successful submission
                setSurvey({
                    "surveyName": "",
                    "description": "",
                    "question": "",
                    "options": ""
                });
            }
        } catch (error) {
            toast.error("Thêm khảo sát thất bại!");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="Add_Survey_Container">
                <div className="Add_Survey_Header">
                    <h4 className="text-primary">Tạo khảo sát</h4>
                </div>
                <div className="Add_Survey_Body">
                    <div className="Add_Survey_SurveyName">
                        <Form.Label style={{ width: "20%" }}>Tên khảo sát</Form.Label>
                        <Form.Control type="text" onChange={(e) => changeSurvey(e, "surveyName")} placeholder="Tên khảo sát" required />
                    </div>
                    <div className="Add_Survey_Description">
                        <Form.Label style={{ width: "20%" }}>Mô tả</Form.Label>
                        <Form.Control as="textarea" onChange={(e) => changeSurvey(e, "description")} placeholder="Mô tả" required />
                    </div>
                    <div className="Add_Survey_Question">
                        <Form.Label style={{ width: "20%" }}>Câu hỏi</Form.Label>
                        <Form.Control type="text" onChange={(e) => changeSurvey(e, "question")} placeholder="Câu hỏi" required />
                    </div>
                    <div className="Add_Survey_Options">
                        <Form.Label style={{ width: "20%" }}>Tùy chọn</Form.Label>
                        <Form.Control type="text" onChange={(e) => changeSurvey(e, "options")} placeholder="Tùy chọn" required />
                    </div>
                    <div className="Add_Survey_Button">
                        <button type="button">Hủy</button>
                        <button type="button" onClick={(e) => addSurvey(e)} disabled={loading}>{loading ? "Đang thêm..." : "Thêm"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSurvey;
