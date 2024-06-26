import { useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";
import './body.css';

const WriteFeedback = ({ currentUserId }) => {
  const [feedback, setFeedback] = useState("");

  const handleSendFeedback = async () => {
    try {
      await Apis.post(endpoints['send-feedback'], {
        user_id: currentUserId,
        contents: feedback
      });
      alert("Phản ánh của bạn đã được gửi thành công!");
    } catch (error) {
      console.log(error);
      alert("Gửi phản ánh không thành công!");
    }
  };

  return (
    <div className="WriteFeedback_Wrapper">
      <div className="WriteFeedback_Content">
        <div className="WriteFeedback_Content_Header">
          <h3>Gửi phản ánh</h3>
        </div>
        <div className="WriteFeedback_Content_Textarea">
          <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Nhập phản ánh của bạn..." />
        </div>
        <div className="WriteFeedback_Content_Button">
          <button onClick={handleSendFeedback}>Gửi phản ánh</button>
        </div>
      </div>
    </div>
  );
};

export default WriteFeedback;
