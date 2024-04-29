import Body from "./Body";
import Header from "./Header";
import Sidebar from "./SideBar";
import cookie from "react-cookies";
import { useContext, useEffect, useRef, useState } from "react";
import { MyUserContext } from "../../App";
import { toast } from "react-toastify";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";

const HomeAdmin = () => {
  const [current_user] = useContext(MyUserContext);
  const navigate = useNavigate();

  var isAdmin = 0;
  var isLogin = 0;
  /*
  const checkLogin = (current_user) => {
    if (isLogin === 0) {
      if (current_user === null) {
        toast("Vui lòng đăng nhập!");
        isLogin = 1;
        navigate("/login");
      }
    }
  };

  const adminAuth = (current_user) => {
    if (isAdmin === 0) {
      if (current_user !== null && current_user.roleId.roleId !== 1) {
        toast.error("Bạn không có quyền truy cập!");
        isAdmin = 1;
        navigate("/");
      }
    }
  };

  useEffect(() => {
    checkLogin(current_user);
    adminAuth(current_user);
  }, [current_user]);

  useEffect(() => {
    let client = cookie.load("socket")
    console.log("Client", client?.connected);
    if (current_user && client) {
        cookie.remove("socket");
    }
}, [])
*/

  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center">
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
export default HomeAdmin;
