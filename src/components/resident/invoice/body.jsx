import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function InvoiceLookupPage() {
  const [invoices, setInvoices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu lấy các hóa đơn đã thanh toán từ máy chủ khi component được tải
    fetchInvoices()
      .then((data) => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching invoices:', error));
  }, []);

  const fetchInvoices = async () => {
    // Giả sử lấy danh sách các hóa đơn đã thanh toán từ máy chủ
    const response = await fetch('https://example.com/api/invoices');
    const data = await response.json();
    return data;
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm hóa đơn
    // Nếu searchTerm không rỗng, có thể gửi yêu cầu tìm kiếm đến máy chủ
    // Ví dụ: fetchInvoicesWithSearch(searchTerm)
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tra cứu hóa đơn đã thanh toán</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Nhập mã hóa đơn hoặc thông tin khách hàng"
          className="w-full p-2 border rounded"
        />
        <button onClick={handleSearch} className="ml-4 bg-blue-500 hover:bg-blue-700 
        text-white font-bold py-2 px-4 rounded"><SearchIcon></SearchIcon>Tìm kiếm</button>
      </div>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-500">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-500 px-4 py-2">Mã hóa đơn</th>
              <th className="border border-gray-500 px-4 py-2">Tên khách hàng</th>
              <th className="border border-gray-500 px-4 py-2">Ngày thanh toán</th>
              <th className="border border-gray-500 px-4 py-2">Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td className="border border-gray-500 px-4 py-2">{invoice.id}</td>
                <td className="border border-gray-500 px-4 py-2">{invoice.customerName}</td>
                <td className="border border-gray-500 px-4 py-2">{invoice.paymentDate}</td>
                <td className="border border-gray-500 px-4 py-2">{invoice.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvoiceLookupPage;
