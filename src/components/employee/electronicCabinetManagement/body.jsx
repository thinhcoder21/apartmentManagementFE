import React, { useState } from 'react';

function ElectronicManagement() {
  // Dữ liệu các vật phẩm trong tủ đồ
  const [electronicCabinetItems, setelectronicCabinetItems] = useState([
    { id: 1, name: 'Item 1', isActive: true },
    { id: 2, name: 'Item 2', isActive: false },
    { id: 3, name: 'Item 3', isActive: true },
    { id: 4, name: 'Item 4', isActive: false },
  ]);

  // Hàm xử lý thay đổi trạng thái isActive của vật phẩm
  const toggleItemStatus = (id) => {
    setelectronicCabinetItems(electronicCabinetItems.map(item => (item.id === id ? { ...item, isActive: !item.isActive } : item)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Electronice Cabinet Management</h1>
      
      {/* Danh sách vật phẩm */}
      <ul>
        {electronicCabinetItems.map(item => (
          <li key={item.id} className="border-b py-2">
            <input type="checkbox" checked={item.isActive} onChange={() => toggleItemStatus(item.id)} className="mr-2" />
            <span className={item.isActive ? "text-lg font-bold" : "text-gray-500"}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ElectronicManagement;
