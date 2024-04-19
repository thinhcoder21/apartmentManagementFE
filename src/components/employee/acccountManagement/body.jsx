import React, { useState, useEffect } from "react";

function CurrentUserPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then((data) => {
        setCurrentUser(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching current user:", error));
  }, []);

  const fetchCurrentUser = async () => {
    const response = await fetch("https://example.com/api/currentUser");
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thông tin người dùng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dl>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Họ và tên</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {currentUser.name}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {currentUser.email}
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Số điện thoại
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                  {currentUser.phone}
                </dd>
              </div>
              {/* Thêm các trường thông tin khác cần hiển thị */}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentUserPage;
