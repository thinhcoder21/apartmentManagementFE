import React, { useState } from 'react';
import Header from "../Header";
import Sidebar from "../SideBar";
import Body from './body'

function AddServiceForm({ onAddService }) {
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
}

export default AddServiceForm;
