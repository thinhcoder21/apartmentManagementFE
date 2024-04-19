import React, { useState, useEffect } from 'react';

function InvoicePage() {
  // State để lưu trữ danh sách các hóa đơn
  const [invoices, setInvoices] = useState([]);

  // Hàm để lấy danh sách các hóa đơn từ server (giả sử dữ liệu được lấy từ API)
  const fetchInvoices = async () => {
    try {
      // Gọi API để lấy danh sách các hóa đơn
      const response = await fetch('https://api.example.com/invoices');
      if (!response.ok) {
        throw new Error('Failed to fetch invoices');
      }
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  // Gọi hàm fetchInvoices khi component được render lần đầu (tương đương với componentDidMount)
  useEffect(() => {
    fetchInvoices();
  }, []);

  // Hàm xóa hóa đơn
  const handleDeleteInvoice = async (id) => {
    try {
      // Gọi API để xóa hóa đơn với id tương ứng
      const response = await fetch(`https://api.example.com/invoices/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete invoice');
      }
      // Sau khi xóa thành công, cập nhật lại danh sách hóa đơn bằng cách gọi lại hàm fetchInvoices
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Invoices</h1>
      
      {/* Danh sách các hóa đơn */}
      <ul>
        {invoices.map(invoice => (
          <li key={invoice.id} className="border-b py-2 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{invoice.name}</h2>
              <p className="text-gray-600">Date: {invoice.date}</p>
              <p className="text-gray-600">Amount: {invoice.amount}</p>
            </div>
            <button 
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => handleDeleteInvoice(invoice.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoicePage;
