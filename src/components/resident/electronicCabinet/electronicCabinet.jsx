import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Body from "./body";
import Header from "../Header";
import React from "react";
import Sidebar from "../SideBar";

const ElectronicCabinet = () => {
    var value = {
      page: "0",
      size: "1000",
    };
    return (
      <div className="bg-[#d6d9e0] h-screen flex items-center ">
        <div className="flex bg-[#f4f6fa] w-full h-full overflow-y-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <Body />
          </div>
        </div>
      </div>
    );
  };
  
  export default ElectronicCabinet;