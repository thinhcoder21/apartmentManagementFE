  import { NavLink } from "react-router-dom";
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  import HomeIcon from "@mui/icons-material/Home";
  import logo from "./logo2.png";
  import React from "react";
  import KitchenIcon from '@mui/icons-material/Kitchen';
  import SearchIcon from '@mui/icons-material/Search';
  import CreateIcon from '@mui/icons-material/Create';
  import NotesIcon from '@mui/icons-material/Notes';
  import PollIcon from '@mui/icons-material/Poll';

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
              to="/resident/home"
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
              to="/electronicCabinet"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <KitchenIcon className="" />
              <h1 className="font-normal"> Tủ đồ điện tử </h1>
            </NavLink>
            <NavLink
              to="/invoice "
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <SearchIcon className="" />
              <h1 className="font-normal">Tra cứu hóa đơn</h1>
            </NavLink>
            <NavLink
              to="/reflect"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <NotesIcon className="" />
              <h1 className="font-normal">Viết phản ánh</h1>
            </NavLink>
            <NavLink
              to="/response"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <PollIcon className="" />
              <h1 className="font-normal">Điền Khảo Sát</h1>
            </NavLink>
            <NavLink
              to="/residentaccmanagement "
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <ManageAccountsIcon className="" />
              <h1 className="font-normal">Quản lý tài khoản</h1>
            </NavLink>
            <NavLink
              to="/residentupdatepassword"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h1 className="font-normal">Đổi mật khẩu</h1>
            </NavLink>
          </div>
        </div>
      </div>
    );
  };

  export default Sidebar;
