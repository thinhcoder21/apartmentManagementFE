import React, { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AddIcon from "@mui/icons-material/Add";

// Modal component
function AddSurveyModal({
  isOpen,
  onClose,
  onAddsurvey,
  saving,
  handleClickSave,
  handleClickCancel,
}) {
  const [newsurvey, setNewsurvey] = useState({
    name: "",
    type: "",
    fee: "",
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setNewsurvey((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddsurvey(newsurvey);
    setNewsurvey({
      name: "",
      type: "",
      fee: "",
      isActive: false,
    });
    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden 
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={newsurvey.name}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 
                      block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="type"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Type
                    </label>
                    <input
                      id="type"
                      name="type"
                      value={newsurvey.type}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block 
                      w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter type"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Start Date
                    </label>
                    <input
                      id="startDate"
                      name="startDate"
                      value={newsurvey.startDate}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block 
                      w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter start date"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      End Date
                    </label>
                    <input
                      id="endDate"
                      name="endDate"
                      value={newsurvey.endDate}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full 
                      shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter end date"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="isActive"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Is Active
                    </label>
                    <input
                      id="isActive"
                      name="isActive"
                      checked={newsurvey.isActive}
                      onChange={handleChange}
                      type="checkbox"
                      className="mt-1 focus:ring-blue-500 h-4 w-4 text-blue-600
                       border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="fee"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Fee
                    </label>
                    <input
                      id="fee"
                      name="fee"
                      value={newsurvey.fee}
                      onChange={handleChange}
                      type="text"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500
                       block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter fee"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                onClick={handleClickSave}
                disabled={saving}
                className={`${
                  saving ? "opacity-50 cursor-not-allowed" : ""
                } w-full inline-flex justify-center rounded-md border border-transparent
                 shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm`}
              >
                <SaveIcon className="mr-2" /> Lưu
              </button>
              <button
                type="button"
                onClick={handleClickCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border
                 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                <NotInterestedIcon className="mr-2" /> Bỏ qua
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Main component
function SurveyPage() {
  const [newsurvey, setNewsurvey] = useState({
    name: "",
    type: "",
    fee: "",
    isActive: false, // Thêm trạng thái cho ô checkbox
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setNewsurvey((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value, // Xử lý cho ô checkbox
    }));
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu lấy danh sách phiếu khảo sát từ máy chủ khi component được tải
    fetchSurveys()
      .then((data) => {
        setSurveys(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching surveys:', error));
  }, []);

  const fetchSurveys = async () => {
    // Giả sử lấy danh sách phiếu khảo sát từ máy chủ
    const response = await fetch('https://example.com/api/surveys');
    const data = await response.json();
    return data;
  };


  const handleAddsurvey = (newsurvey) => {
    const newsurveyWithId = { ...newsurvey, id: Date.now() };
    setSurveys((prevsurveys) => [...prevsurveys, newsurveyWithId]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Survey Information</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <AddIcon></AddIcon>Add survey
      </button>
      <table className="mt-6 w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">isActive</th>
            <th className="border border-gray-500 px-4 py-2">ID</th>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">type</th>
            <th className="border border-gray-500 px-4 py-2">fee</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={newsurvey.id}>
              <td className="border border-gray-500 px-4 py-2">
                <input
                  id="isActive"
                  name="isActive"
                  checked={survey.isActive} // Đặt giá trị của checked bằng thuộc tính của state
                  onChange={handleChange} // Gọi hàm handleChange khi checkbox được thay đổi
                  type="checkbox" // Định nghĩa input là một ô checkbox
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded" // Thêm các lớp CSS để tạo kiểu cho checkbox
                />
                {survey.isActive}
              </td>
              <td className="border border-gray-500 px-4 py-2">{survey.id}</td>
              <td className="border border-gray-500 px-4 py-2">
                {survey.name}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {survey.type}
              </td>
              <td className="border border-gray-500 px-4 py-2">{survey.fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddSurveyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddsurvey={handleAddsurvey}
      />
    </div>
  );
}

export default SurveyPage;
