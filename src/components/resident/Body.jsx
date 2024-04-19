import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SmartToyIcon from '@mui/icons-material/SmartToy';

const Body = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome to Your Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Account Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Account Information</h2>
            <p className="text-gray-600">Chào</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              View Details
            </button>
          </div>

          {/* Card 2: Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <ul className="space-y-2">
              <li className="text-gray-800">You have a new message</li>
              <li className="text-gray-800">Your order has shipped</li>
              <li className="text-gray-800">New promotion available</li>
            </ul>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              View Notifications
            </button>
          </div>
        </div>
      </main>
      {/* Add your main content here */}

      {/* Footer */}
      {/* Add your footer here */}

      {/* Chat Bot */}
      {showChatBot && (
        <div className="fixed bottom-4 right-4 z-50">
          {/* Your chat bot component goes here */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Chat Bot</h2>
            {/* Chat bot messages go here */}
            <div className="overflow-y-auto h-64">
              {/* Example message */}
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
                <p className="text-gray-800">Hello, how can I assist you?</p>
              </div>
              {/* Example message */}
              <div className="flex items-center justify-end mb-2">
                <p className="text-gray-600">
                  I'm sorry, I cannot help with that.
                </p>
                <div className="w-8 h-8 bg-gray-300 rounded-full ml-2"></div>
              </div>
            </div>
            {/* Chat input */}
            <input
              type="text"
              className="w-full border-gray-300 border rounded-md px-3 py-2 mt-4"
              placeholder="Type your message here..."
            />
          </div>
        </div>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full fixed bottom-4 right-4 z-50"
        onClick={toggleChatBot}
      >
        <SmartToyIcon></SmartToyIcon>
      </button>
    </div>
  );
};

export default Body;
