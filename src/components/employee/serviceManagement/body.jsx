import React, { useState } from 'react';

function ManageServicesPage() {
  // Dữ liệu dịch vụ
  const [services, setServices] = useState([
    { id: 1, name: 'Service 1', description: 'Description 1' },
    { id: 2, name: 'Service 2', description: 'Description 2' },
    { id: 3, name: 'Service 3', description: 'Description 3' },
  ]);

  // Trạng thái biểu mẫu thêm/sửa dịch vụ
  const [formData, setFormData] = useState({ id: '', name: '', description: '' });
  const [editing, setEditing] = useState(false);

  // Hàm xử lý thêm dịch vụ
  const addService = () => {
    if (!formData.name || !formData.description) return;
    setServices([...services, { ...formData, id: Date.now() }]);
    setFormData({ id: '', name: '', description: '' });
  };

  // Hàm xử lý sửa dịch vụ
  const editService = (id) => {
    const serviceToEdit = services.find(service => service.id === id);
    if (!serviceToEdit) return;
    setFormData(serviceToEdit);
    setEditing(true);
  };

  // Hàm cập nhật dịch vụ đã sửa
  const updateService = () => {
    if (!formData.name || !formData.description) return;
    setServices(services.map(service => (service.id === formData.id ? formData : service)));
    setFormData({ id: '', name: '', description: '' });
    setEditing(false);
  };

  // Hàm xử lý xóa dịch vụ
  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Manage Services</h1>
      
      {/* Form thêm/sửa dịch vụ */}
      <form onSubmit={editing ? updateService : addService} className="mb-4">
        <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm mb-2 p-2" />
        <input type="text" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="block w-full border-gray-300 rounded-md shadow-sm mb-2 p-2" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">{editing ? 'Update' : 'Add'}</button>
        {editing && <button onClick={() => setEditing(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>}
      </form>
      
      {/* Danh sách dịch vụ */}
      <ul>
        {services.map(service => (
          <li key={service.id} className="border-b py-2">
            <span className="text-lg font-bold">{service.name}</span> - {service.description}
            <button onClick={() => editService(service.id)} className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded">Edit</button>
            <button onClick={() => deleteService(service.id)} className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageServicesPage;
