import Body from "./body";
import Header from "../Header";
import React from "react";
import Sidebar from "../Sidebar";

const ReflectManagement = () => {
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
  
  export default ReflectManagement;