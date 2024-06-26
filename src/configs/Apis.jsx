import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:3000/apartmentManagement/";

export const endpoints = {
  /* resident */
  login: "/api/login/",
  "current-user": "/api/current-user/",
  "send-feedback": `/api/send-feedback/`,
  "user-status": (userId) => `/api/users/${userId}/status`,
  "update-user": `/api/update-user/`,
  /* avatar */
  "update-avatar": (userId) => `/api/users/${userId}/update-avatar`,
  "load-avatar": (userId) => `/api/users/${userId}/avatar`,
  /* survey */
  "load-survey": `/api/survey/`,
  "response-survey": (surveyId) => `/api/survey/${surveyId}/response/`,
  "load-surveyform-by-id": (surveyformId) => `/api/survey/${surveyformId}/`,
  /* invoice */
  "payment-invoice": (invoiceId) => `/api/payment/${invoiceId}/`,
  "load-paid-invoices": (userId) => `/api/${userId}/paid-invoices/`,
  /* locker */
  "load-locker-by-userID": (userId) => `/api/${userId}/locker/`,

  "change-password": `/api/change-password/`,
};

export const authApi = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Authorization': `${cookie.load('token')}`
    },
  });
};

export default axios.create({
  //tên miền
  baseURL: BASE_URL,
});
