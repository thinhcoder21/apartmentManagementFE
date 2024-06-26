import { useEffect, useState } from "react";
import Apis, { endpoints } from "../../../configs/Apis";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const response = await Apis.get(endpoints["user-feedbacks"]);
        setFeedbacks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadFeedbacks();
  }, []);

  return (
    <div>
      <h1>Quản lí phản ánh người dùng</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên người dùng</th>
            <th>Nội dung phản ánh</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(feedbacks) ? (
            feedbacks.map((feedback) => (
              <tr key={feedback.id}>
                <td>{feedback.id}</td>
                <td>{feedback.User.name}</td>
                <td>{feedback.content}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Không có phản ánh nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackManagement;
