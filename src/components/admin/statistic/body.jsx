import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import Apis, { endpoints } from "../../../configs/Apis";

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
        drawChart(data);
      })
      .catch((error) => console.error("Error fetching statistics:", error));
  }, []);

  const fetchStatistics = async () => {
    const response = await Apis.get(endpoints['statistic']);
    const data = await response.json();
    return data;
  };

  const drawChart = (data) => {
    const ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Người Dùng", "Nhân Viên", "Căn Hộ Đã Cho Thuê"],
        datasets: [{
          label: "Số Lượng",
          data: [data.userCount, data.employeeCount, data.apartmentCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Thống kê theo tháng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <canvas id="myChart" width="400" height="400"></canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatisticsPage;
