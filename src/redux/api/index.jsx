import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("adminUser")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("adminUser")).retObj.jwt
    }`;
  }
  return req;
});

export const userLogin = (formData) => API.post("/api/auth/signin", formData);

export const getAllUser = () => API.get("/api/admin/user");
export const addUser = (user) => API.post("/api/admin/user", user);
export const updateUser = (updateUser) => API.put("/api/admin/lop", updateUser);
export const deleteUser = (data) => API.delete("api/admin/user", { data });

export const addSurvey = (survey) => API.post("/api/admin/survey", survey);
export const deleteSurvey = (data) => API.delete("api/admin/survey", { data });

export const addEmployee = (employee) => API.post("/api/admin/addEmployee", employee);


export const getAllUnit = () => API.get("/api/admin/getalluser");
export const getUserUnit = (unit, page, size) =>
  API.get(`/api/admin/user/${unit}?page=${page}&size=${size}`);

export const updatePassword = (updatePassword) =>
  API.put("/api/admin/updatePassword", updatePassword);
