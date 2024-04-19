import React, { useState } from 'react';

function ExistingServices({ services }) {
  return (
    <div>
      <h2>Danh sách dịch vụ đã có</h2>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <strong>Tên dịch vụ:</strong> {service.name}<br />
            <strong>Loại dịch vụ:</strong> {service.type}<br />
            <strong>Ngày thêm:</strong> {service.startDate}<br />
            <strong>Ngày hết hạn:</strong> {service.endDate}<br />
            <strong>Trạng thái:</strong> {service.isActive ? 'Active' : 'Inactive'}<br />
            <strong>Phí dịch vụ:</strong> {service.fee}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExistingServices;
