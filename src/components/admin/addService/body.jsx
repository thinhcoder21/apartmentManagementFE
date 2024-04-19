import React, { useState,useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import AddIcon from "@mui/icons-material/Add";

// Modal component
function AddServiceModal({
  isOpen,
  onClose,
  onAddService,
  saving,
  handleClickSave,
  handleClickCancel,
}) {
  const [newservice, setNewservice] = useState({
    name: "",
    type: "",
    fee: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewservice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddService(newservice);
    setNewservice({
      name: "",
      type: "",
      fee: "",
    });
    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20
       text-center sm:block sm:p-0">
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
                      value={newservice.name}
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
                      value={newservice.type}
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
                      value={newservice.startDate}
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
                      value={newservice.endDate}
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
                      checked={newservice.isActive}
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
                      value={newservice.fee}
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
function ServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu lấy danh sách dịch vụ từ máy chủ khi component được tải
    fetchServices()
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  const fetchServices = async () => {
    // Giả sử lấy danh sách dịch vụ từ máy chủ
    const response = await fetch("https://example.com/api/services");
    const data = await response.json();
    return data;
  };

  const handleAddService = (newservice) => {
    const newserviceWithId = { ...newservice, id: Date.now() };
    setServices((prevservices) => [...prevservices, newserviceWithId]);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service Information</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        <AddIcon></AddIcon>Add service
      </button>
      <table className="mt-6 w-full border-collapse border border-gray-500">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-500 px-4 py-2">ID</th>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">type</th>
            <th className="border border-gray-500 px-4 py-2">fee</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td className="border border-gray-500 px-4 py-2">{service.id}</td>
              <td className="border border-gray-500 px-4 py-2">
                {service.name}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {service.type}
              </td>
              <td className="border border-gray-500 px-4 py-2">
                {service.fee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddService={handleAddService}
      />
    </div>
  );
}

export default ServicePage;
