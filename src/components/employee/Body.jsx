import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { MyUserContext } from "../../App";
import { toast } from "react-toastify";
import cookie from "react-cookies";

const Body = () => {
  const [current_user] = useContext(MyUserContext);
  var isEmployee = 0;
  var isLogin = 0;

  /*
  const checkLogin = (current_user) => {
    if (isLogin === 0) {
      if (current_user === null) {
        toast("Vui lòng đăng nhập!");
        isLogin = 1;
        nav("/login");
      }
    }
  };

  const employeeAuth = (current_user) => {
    if (isEmployee === 0) {
      if (current_user !== null && current_user?.roleId.roleId !== 2) {
        toast.error("Bạn không có quyền truy cập!");
        isEmployee = 1;
        nav("/");
      }
    }
  };

  useEffect(() => {
    checkLogin(current_user);
    employeeAuth(current_user);
  }, [current_user]);

  useEffect(() => {
    let client = cookie.load("socket");
    console.log("Client", client?.connected);
    if (current_user && client) {
      cookie.remove("socket");
    }
  }, []);
  */
  const nav = useNavigate();

  return <h1>day la body</h1>;
};

export default Body;
