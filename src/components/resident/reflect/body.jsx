import React, { useState } from 'react';

function FeedbackPage() {
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendFeedbackToServer(feedback)
      .then(() => alert('Phản ánh của bạn đã được gửi thành công!'))
      .catch(error => console.error('Error sending feedback:', error));
    setFeedback('');
  };

  const sendFeedbackToServer = async (feedback) => {
    // Giả sử gửi phản ánh đến máy chủ
    const response = await fetch('https://example.com/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ feedback })
    });
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Phản ánh của bạn</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Nội dung phản ánh</label>
          <textarea id="feedback" name="feedback" value={feedback} onChange={handleChange} rows="4" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Gửi phản ánh</button>
      </form>
    </div>
  );
}

export default FeedbackPage;
