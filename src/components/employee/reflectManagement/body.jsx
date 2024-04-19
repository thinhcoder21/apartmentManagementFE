import React, { useState, useEffect } from 'react';

function FeedbackPage() {
  // Dữ liệu phản ánh từ người dùng
  const [feedbacks, setFeedbacks] = useState([]);

  // Hàm để lấy dữ liệu phản ánh từ server (giả sử dữ liệu được lấy từ API)
  const fetchFeedbacks = async () => {
    try {
      // Gọi API để lấy dữ liệu phản ánh
      const response = await fetch('https://api.example.com/feedbacks');
      if (!response.ok) {
        throw new Error('Failed to fetch feedbacks');
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  // Gọi hàm fetchFeedbacks khi component được render lần đầu (tương đương với componentDidMount)
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Feedbacks from Users</h1>
      
      {/* Danh sách phản ánh từ người dùng */}
      <ul>
        {feedbacks.map(feedback => (
          <li key={feedback.id} className="border-b py-2">
            <h2 className="text-lg font-bold">{feedback.title}</h2>
            <p className="text-gray-600">{feedback.content}</p>
            <p className="text-sm text-gray-400">Sent by: {feedback.sender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackPage;
