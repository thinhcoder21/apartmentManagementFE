import { useContext, useState } from "react";
import cookie from "react-cookies";
import Apis, { authApi, endpoints } from "../configs/Apis";
import { Navigate, useNavigate } from "react-router-dom";
import { MyUserContext } from "../App";
import { MyDispatchContext } from "../configs/Context";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import logo from "./assets/images/avatar-user.png";

const Login = () => {
  const [user, setUser] = useState({});
  const dispatch = useContext(MyDispatchContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const change = (e, field) => {
    setUser((current) => {
      return { ...current, [field]: e.target.value };
    });
  };

  const login = async (evt) => {
    evt.preventDefault();
    try {
      let res = await Apis.post(endpoints["login"], {
        username: username,
        password: password,
      });
      console.info(res.data);
      cookie.save("token", res.data);

      let u = await authApi().get(endpoints["current-user"]);
      console.info("info", u.data);
      if (u.data.active === 0) {
        alert("Tài khoản của bạn đã bị khóa");
        nav("/login");
      } else {
        dispatch({
          type: "login",
          payload: u.data,
        });
      }
      cookie.save("user", u.data);
      if (res.status === 200) toast.success("Đăng nhập thành công!");
    } catch (err) {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    }
  };
  return (
    <>
      <div className="relative w-full h-screen p-10 bg-lite isolate">
        <img src={logo} alt="bg" className=" w-[74px] h-[74px]" />

        <div className="flex items-center justify-center bg-lite">
          <div>
            <form
              onSubmit={login}
              className="flex flex-col items-center justify-center space-y-6 duration-1000 bg-white shadow-2xl h-99 w-96 rounded-3xl"
            >
              <h1 className="mt-2 text-3xl font-semibold text-text2">
                Đăng Nhập
              </h1>

              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-800">
                  Username
                </label>
                <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    name="username"
                    type="text"
                    required
                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Enter your username"
                  />
                  <div className="absolute ml-[225px] mt-2">
                    <PersonIcon></PersonIcon>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>

                <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="relative block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Enter your password"
                  />
                  <div className="absolute ml-[225px] mt-2">
                    {showPassword ? (
                      <VisibilityIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      />
                    ) : (
                      <VisibilityOffIcon
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="flex items-center justify-center w-32 py-1 mb-2 text-base text-white duration-150 rounded-lg hover:scale-105 bg-primary "
              >
                Login
              </button>
              <div>
                <LocalPhoneIcon></LocalPhoneIcon>
                <label className="text-base ml-2">Hỗ trợ: 0917 558 807</label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
