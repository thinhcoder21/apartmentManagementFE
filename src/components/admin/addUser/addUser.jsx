import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Body from "./body";
import Header from "../Header";
import React from "react";
import Sidebar from "../SideBar";
import {
    getAllUser,
} from "../../../redux/actions/adminActions";

const AddUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
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

export default AddUser;