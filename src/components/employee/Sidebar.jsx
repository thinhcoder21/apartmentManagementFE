import { NavLink } from "react-router-dom";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import logo from "./logo2.png";
import React from "react";
import KitchenIcon from '@mui/icons-material/Kitchen';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import NotesIcon from '@mui/icons-material/Notes';

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-white hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
  "svg: flex items-center px-5 gap-3 text-red font-bold hover:text-black  transition-all duration-200 ease-in-out capitalize hover:bg-gray-200  py-2 my-1";

const Sidebar = () => {
  return (
    <div className="flex-[0.2] w-[268px] h-full">
      <div className="ml-1  pt-4 space-y-8  h-full bg-[#04605E]">
        <div>
          <img src={logo} alt="" className="mr-3 h-[74px] ml-20 " />
        </div>
        <div className="" style={{ marginTop: 0 }}>
          <NavLink
            to="/admin/employeeHome"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <HomeIcon className="" />
            <h1 className="font-normal">Dashboard</h1>
          </NavLink>
        </div>
        <div className="mt-0" style={{ marginTop: 0 }}>
          <NavLink
            to="/employee/eleccabinetmanagement"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <KitchenIcon className="" />
            <h1 className="font-normal">Quản lí tủ đồ điện tử</h1>
          </NavLink>
          <NavLink
            to="/employee/invoicemanagement "
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <SearchIcon className="" />
            <h1 className="font-normal">Quản lí hóa đơn</h1>
          </NavLink>
          <NavLink
            to="/employee/servicemanagement "
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <CreateIcon className="" />
            <h1 className="font-normal">Quản lí dịch vụ</h1>
          </NavLink>
          <NavLink
            to="/employee/reflectmanagement"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <NotesIcon className="" />
            <h1 className="font-normal">Quản lí Phản ánh</h1>
          </NavLink>
          <NavLink
            to="/employee/eaccountmanagement "
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <ManageAccountsIcon className="" />
            <h1 className="font-normal">Quản lý tài khoản</h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
