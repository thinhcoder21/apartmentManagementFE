import React, { useState, useEffect } from 'react';

function ClosetPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gửi yêu cầu lấy danh sách các vật phẩm trong tủ đồ từ máy chủ khi component được tải
    fetchItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const fetchItems = async () => {
    // Giả sử lấy danh sách các vật phẩm trong tủ đồ từ máy chủ
    const response = await fetch('https://example.com/api/closet');
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tủ đồ điện tử</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.id} className="p-4 border rounded">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p>Mã: {item.id}</p>
              <p>Ngày nhận: {item.receivedDate}</p>
              <p>Trạng thái: {item.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClosetPage;
