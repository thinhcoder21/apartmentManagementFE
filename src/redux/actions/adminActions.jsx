import { toast } from "react-toastify";
import * as api from "../api";

import {
  ADD_USER,
  ADD_SURVEY,
  DELETE_USER,
  DELETE_SURVEY,
  LOCK_USER,
  GET_ALL_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
  SET_ERRORS,
  GET_ALL_UNIT,
  GET_USER_UNIT,
  UPDATE_PASSWORD,
  ADD_EMPLOYEE,

} from "../actionTypes";

export const getAllUser = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUser();
    dispatch({ type: GET_ALL_USER, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updatePassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updatePassword(formData);

    if (data.status === "success") {
      toast.success("Đổi mật khẩu thành công!");
      dispatch({ type: UPDATE_PASSWORD, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
      toast.error("Đổi mật khẩu không thành công!");
    }
  } catch (error) {
    console.log("vô đây");
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUserUnit = (unit, page, size) => async (dispatch) => {
  try {
    const { data } = await api.getUserUnit(unit, page, size);

    dispatch({ type: GET_USER_UNIT, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getAllUnit = () => async (dispatch) => {
  try {
    const { data } = await api.getAllUnit();
    dispatch({ type: GET_ALL_UNIT, payload: data.retObj[0] });
  } catch (error) {
    console.log("Redux Error", error);
  }
};

export const updateUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(formData);
    if (data.status === "success") {
      toast.success("Chỉnh sửa người dùng thành công!");
      dispatch({ type: UPDATE_USER, payload: true });
    } else {
      toast.error("Chỉnh sửa sinh viên không thành công!");
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const addUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addUser(formData);
    if (data.status === "success") {
      toast.success("Thêm người dùng mới thành công!");
      dispatch({ type: ADD_USER, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const addSurvey = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addSurvey(formData);
    if (data.status === "success") {
      toast.success("Thêm bài khảo sát mới thành công!");
      dispatch({ type: ADD_SURVEY, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const addEmployee = (formData) => async (dispatch) => {
  try {
    const { data } = await api.addEmployee(formData);
    if (data.status === "success") {
      toast.success("Thêm bài khảo sát mới thành công!");
      dispatch({ type: ADD_EMPLOYEE, payload: true });
    } else {
      dispatch({ type: SET_ERRORS, payload: data });
    }
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.status === "error"
    ) {
      dispatch({ type: SET_ERRORS, payload: error.response.data });
    } else {
      console.log("Unknown error occurred");
    }
  }
};

export const deleteUser = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteUser(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa người dùng thành công!");
      dispatch({ type: DELETE_USER, payload: true });
    } else {
      toast.error("Xóa người dùng này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không Thành công" });
  }
};

export const deleteSurvey = (formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteSurvey(formData);
    if (data.status === "success" && data.retObj.length > 0) {
      toast.success("Xóa bài khảo sát thành công!");
      dispatch({ type: DELETE_SURVEY, payload: true });
    } else {
      toast.error("Xóa bài khảo sát này không thành không!");
      dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không thành công" });
    }
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: "Xóa sinh viên không Thành công" });
  }
};

/*
 */
