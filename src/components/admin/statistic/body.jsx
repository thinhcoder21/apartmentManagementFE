import React, { useState, useEffect } from "react";

function StatisticsPage() {
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [apartmentCount, setApartmentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics()
      .then((data) => {
        setUserCount(data.userCount);
        setEmployeeCount(data.employeeCount);
        setApartmentCount(data.apartmentCount);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  const fetchStatistics = async () => {
    const response = await fetch("https://example.com/api/statistics");
    const data = await response.json();
    return data;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thống kê theo tháng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Số lượng người dùng
              </h3>
              <div className="mt-2 text-4xl font-semibold text-gray-700">
                {userCount}
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Số lượng nhân viên
              </h3>
              <div className="mt-2 text-4xl font-semibold text-gray-700">
                {employeeCount}
              </div>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Số lượng căn hộ đã cho thuê
              </h3>
              <div className="mt-2 text-4xl font-semibold text-gray-700">
                {apartmentCount}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;
