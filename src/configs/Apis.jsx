import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/apartmentManagementFE/fe";
const SERVER = "http://localhost:3000";

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/login/`,
    "current-user": `${SERVER_CONTEXT}/api/auth/current-user/`,
    "update-user": `${SERVER_CONTEXT}/api/auth/update-user/`,
    "search-users": `${SERVER_CONTEXT}/api/search-users/`,
    "search-Item-categories": `${SERVER_CONTEXT}/api/search-Item-categories/`,
    "search-employees": `${SERVER_CONTEXT}/api/search-employees/`,
    "admin-add-user": `${SERVER_CONTEXT}/api/auth/admin/add-user/`,
    "admin-add-employee": `${SERVER_CONTEXT}/api/auth/admin/add-employee/`,
    "admin-add-survey": `${SERVER_CONTEXT}/api/auth/admin/add-survey/`,
    "admin-add-service": `${SERVER_CONTEXT}/api/auth/admin/add-service/`,
    "admin-update-user": `${SERVER_CONTEXT}/api/auth/admin/update-user/`,
    "load-user-by-Id": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/`,
    "roles": `${SERVER_CONTEXT}/api/public/roles/`,
    "load-user": `${SERVER_CONTEXT}/api/public/users/`,
    "load-total-user": `${SERVER_CONTEXT}/api/public/totalusers/`,
    "load-total-employee": `${SERVER_CONTEXT}/api/public/totalemployees/`,
    "load-employee": `${SERVER_CONTEXT}/api/public/employees/`,
    "Item-categories": `${SERVER_CONTEXT}/api/auth/item-categories/`,
    "change-password": `${SERVER_CONTEXT}/api/auth/change-password/`,

}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization":  cookie.load("token")
        }
    })
}

export default axios.create({
    //tên miền
    baseURL: SERVER
})