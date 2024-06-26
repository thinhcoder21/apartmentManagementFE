import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/apartmentManagementFE/fe";
const SERVER = "http://localhost:3000";

export const endpoints = {
  "roles": `${SERVER_CONTEXT}/api/auth/roles/`,
  "login": `${SERVER_CONTEXT}/api/auth/login/`,
  "current-user": `${SERVER_CONTEXT}/api/auth/current-user/`,
  "update-user": `${SERVER_CONTEXT}/api/auth/update-user/`,

  /* search */
  "search-users": `${SERVER_CONTEXT}/api/public/search-users/`,
  "search-Item-categories": `${SERVER_CONTEXT}/api/public/search-Item-categories/`,
  "search-employees": `${SERVER_CONTEXT}/api/public/search-employees/`,

  /* admin */
  "admin-add-user": `${SERVER_CONTEXT}/api/admin/add-user/`,
  "admin-add-employee": `${SERVER_CONTEXT}/api/admin/add-employee/`,
  "admin-add-survey": `${SERVER_CONTEXT}/api/admin/add-survey/`,
  "admin-add-fee": `${SERVER_CONTEXT}/api/admin/add-fee/`,
  "admin-update-user": `${SERVER_CONTEXT}/api/admin/update-user/`,

  /*load*/
  "load-user": `${SERVER_CONTEXT}/api/public/users/`,
  "load-total-user": `${SERVER_CONTEXT}/api/public/totalusers/`,
  "load-total-employee": `${SERVER_CONTEXT}/api/public/totalemployees/`,
  "load-locker": `${SERVER_CONTEXT}/api/public/locker/`,
  "load-employee": `${SERVER_CONTEXT}/api/public/employees/`,
  "load-invoices": `${SERVER_CONTEXT}/api/public/load-invoices/`,
  "load-Item-categories": `${SERVER_CONTEXT}/api/public/load-Item-categories/`,
  "load-survey": `${SERVER_CONTEXT}/api/public/survey/`,
  
  /* load by id */
  "load-user-by-Id": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/`,
  "load-locker-by-userID": (userId) =>
    `${SERVER_CONTEXT}/api/auth/${userId}/locker/`,
  "load-surveyform-by-id": (surveyformId) => `${SERVER_CONTEXT}/api/public/survey/${surveyformId}/`,
  "load-paid-invoices": (userId) => `${SERVER_CONTEXT}/api/auth/${userId}/paid-invoices/`,
  "load-question-survey": (surveyId) => `${SERVER_CONTEXT}/api/public/survey/${surveyId}/questions`,
  /* resident */
  "send-feedback": `${SERVER_CONTEXT}/public/send-feedback/`,
  "register-service": `${SERVER_CONTEXT}/api/register-service/`,
  "response-survey" : (surveyId) => `${SERVER_CONTEXT}/survey/${surveyId}/response/`,
  'payment-invoice' : (invoiceId) => `${SERVER_CONTEXT}/payment/${invoiceId}/`,
  'user-status' : (userId) => `${SERVER_CONTEXT}/api/users/${userId}/status`,
  'update-avatar': (userId) => `${SERVER_CONTEXT}/api/users/${userId}/update-avatar`,
  'load-avatar': (userId) => `${SERVER_CONTEXT}/api/users/${userId}/avatar`,

  /* item trong locker */
  "add-Item-categories": `${SERVER_CONTEXT}/api/public/add-Item-categories/`, 
  "update-Item-categories": (itemId) => `${SERVER_CONTEXT}/api/auth/update-Item-categories/${itemId}/`, 
  "delete-Item-categories": (itemId) => `${SERVER_CONTEXT}/api/auth/delete-Item-categories/${itemId}/`,

  /*  */
  "delete-service": (serviceId) => `${SERVER_CONTEXT}/api/auth/delete-service/${serviceId}/`,
  "update-service": (serviceId) => `${SERVER_CONTEXT}/api/auth/update-service/${serviceId}/`,

  /* other */
  "statistic": `${SERVER_CONTEXT}/api/auth/admin/statistic/`,
  "change-password": `${SERVER_CONTEXT}/api/auth/change-password/`,


};

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: cookie.load("token"),
    },
  });
};

export default axios.create({
  //tên miền
  baseURL: SERVER,
});
