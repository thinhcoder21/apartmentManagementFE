import React, { useState, useEffect } from 'react';

function ServiceRegistration() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [registrationInfo, setRegistrationInfo] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    // Lấy dữ liệu dịch vụ từ máy chủ
    fetchServicesFromServer()
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  const fetchServicesFromServer = async () => {
    // Giả sử gọi API để lấy dữ liệu dịch vụ từ máy chủ
    const response = await fetch('https://example.com/api/services');
    const data = await response.json();
    return data;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi thông tin đăng ký dịch vụ đến máy chủ
    sendRegistrationToServer(registrationInfo, selectedService)
      .then(() => alert('Đăng ký dịch vụ thành công!'))
      .catch(error => console.error('Error registering service:', error));
  };

  const sendRegistrationToServer = async (registrationInfo, selectedService) => {
    // Giả sử gửi thông tin đăng ký dịch vụ đến máy chủ
    const response = await fetch('https://example.com/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ registrationInfo, selectedService })
    });
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Đăng ký dịch vụ</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Họ và tên</label>
          <input type="text" id="fullName" name="fullName" value={registrationInfo.fullName} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" value={registrationInfo.email} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={registrationInfo.phoneNumber} onChange={handleChange} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">Dịch vụ</label>
          <select id="service" name="service" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            <option value="">Chọn dịch vụ</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đăng ký</button>
      </form>
    </div>
  );
}

export default ServiceRegistration;
