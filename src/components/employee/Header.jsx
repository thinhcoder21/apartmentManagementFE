import Swal from "sweetalert2";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
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
        dispatch({ type: "ADMIN_LOGOUT" });
        navigate("/");
      }
    });
  };
  return (
    <div className="flex bg-[#FFFFFF] items-center justify-between  h-[74px] w-full">
      <div className="flex items-center">
        <h1 className="ml-5 text-lg font-bold text-green-700"> Green House</h1>
      </div>
      <div className="flex items-center mx-5 space-x-3">
        <Avatar />
        <LogoutIcon
          onClick={logout}
          className="transition-all cursor-pointer hover:scale-125 "
        />
      </div>
    </div>
  );
};

export default Header;
