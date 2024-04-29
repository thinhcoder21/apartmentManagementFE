import "./Calendar.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Calendar from "react-calendar";
import Clock from "react-clock";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import React, { useEffect, useState, useContext, useRef } from "react";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import { toast } from "react-toastify";
import Apis, {endpoints} from "../../configs/Apis";

const Body = () => {
  const [value, onChange] = useState(new Date());
  const [valueDate, setValueDate] = useState(new Date());
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        let res = await Apis.get(endpoints['load-total-user'])
        setTotalUsers(res.data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalEmployees = async () => {
      try {
        let res = await Apis.get(endpoints['load-total-employee'])
        setTotalEmployee(res.data.totalEmployee);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    fetchTotalEmployees();
  }, []);


  useEffect(() => {
    const interval = setInterval(() => setValueDate(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //timer
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return { hours, minutes, seconds };
  };
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5">
      <div className="space-y-5">
        <div className="flex items-center space-x-2 text-gray-400 ">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 gap-x-10">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Người dùng</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>

              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold"></h2>
                  <span>Tổng người dùng : {totalUsers}</span>
                </div>

                <div className="relative">
                  <GroupIcon className="text-primary" sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Nhân Viên</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>

              <div className="flex justify-between w-full h-full">
                <div>
                  <h2 className="text-4xl font-bold"></h2>
                  <span>Tổng nhân viên : {totalEmployee}</span>
                </div>

                <div className="relative">
                  <GroupIcon className="text-primary" sx={{ fontSize: 60 }} />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Số căn hộ đã có người ở</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div class="relative h-24 w-24">
                  <div class="absolute inset-0 flex items-center justify-center text-white font-bold">
                    50%
                  </div>
                  <svg
                    class="absolute inset-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#ff6347"
                      stroke-width="4"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#008000"
                      stroke-width="4"
                      fill="none"
                      stroke-dasharray="50 100"
                      stroke-dashoffset="25"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <OtherHousesIcon
                    className="text-primary"
                    sx={{ fontSize: 60 }}
                  />
                </div>
              </div>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <div className="">
                <h1>Số căn hộ trống</h1>
              </div>
              <div className="mt-10 mb-6 border-b-2"></div>
              <div className="flex justify-between w-full h-full">
                <div class="relative h-24 w-24">
                  <div class="absolute inset-0 flex items-center justify-center text-white font-bold">
                    50%
                  </div>
                  <svg
                    class="absolute inset-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#ff6347"
                      stroke-width="4"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#008000"
                      stroke-width="4"
                      fill="none"
                      stroke-dasharray="50 100"
                      stroke-dashoffset="25"
                    />
                  </svg>
                </div>
                <div className="relative">
                  <OtherHousesIcon
                    className="text-primary"
                    sx={{ fontSize: 60 }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full space-y-4">
            <div className="w-full bg-white shadow-lg rounded-xl">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="justify-center ">
              <div>
                Giờ hiện tại là:{" "}
                <strong>
                  {currentTime.hours.toString().padStart(2, "0")}:
                  {currentTime.minutes.toString().padStart(2, "0")}:
                  {currentTime.seconds.toString().padStart(2, "0")}
                </strong>
              </div>
              <Clock value={valueDate} className="mx-auto mt-5 p-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
