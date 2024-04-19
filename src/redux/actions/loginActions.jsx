import { toast } from "react-toastify";
import { LOGIN, SET_ERRORS } from "../actionTypes";
import * as api from "../api";

export const userLogin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userLogin(formData);

    if (data.status === "success") {
      const { roles } = data.retObj;
      const userRole = roles[0];

      // Bổ sung trường "role" vào đối tượng dữ liệu người dùng
      const userData = { ...data, role: userRole };

      dispatch({ type: LOGIN, data: userData });
      toast.success("Đăng nhập thành công!");
      if (userRole === "ROLE_RESIDENT") {
        localStorage.setItem("residentUser", JSON.stringify(userData));
        navigate("/admin/residentHome");
      } else if (userRole === "ROLE_ADMIN") {
        localStorage.setItem("adminUser", JSON.stringify(userData));
        navigate("/admin/home");
      } else {
        localStorage.setItem("employeeUser", JSON.stringify(userData));
        navigate("/admin/employeeHome");
      }
    } else {
      toast.error("Username hoặc Password chưa đúng!");
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};
