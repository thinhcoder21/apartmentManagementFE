import Swal from "sweetalert2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { MyUserContext } from "../../configs/Context";
import { useContext, useEffect, useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import "./Header.css";
import { MyDispatchContext } from "../../configs/Context";
import { Image, Nav } from "react-bootstrap";
const Header = () => {
  const user = useContext(MyUserContext);
  const navigate = useNavigate();

  const logout = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
    }).then(async (result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  

  return (
    <div className="flex bg-[#FFFFFF] items-center justify-between  h-[74px] w-full">
      <div className="flex items-center">
        <h1 className="ml-5 text-lg font-bold text-green-700"> Green House</h1>
      </div>
      <div className="flex items-center mx-5 space-x-3">
      <Nav className="me-auto">
        {user === null ? <>
            <Link to="/login" className="nav-link text-info">
              Đăng nhập
            </Link>
          </>:<>
            <Link to="/" className="nav-link text-success">
              <Image src={user.link_image} width="40" height='40' roundedCircle />{" "}
              {user.fullname}
            </Link>
          </>}
         </Nav>
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
