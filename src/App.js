import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { createContext, useReducer } from "react";
import Login from "./components/login";
import HomeAdmin from "./components/admin/HomeAdmin";
import ResidentHome from "./components/resident/ResidentHome";
import EmployeeHome from "./components/employee/EmployeeHome";
import AddUser from "./components/admin/addUser/addUser";
import AddSurvey from "./components/admin/addSurvey/addSurvey";
import Service from "./components/admin/Service/existsService";
import Statistic from "./components/admin/statistic/satistic";
import AddService from "./components/admin/addService/addService";
import UpdatePassWord from "./components/admin/updatePassword/updatePassword";
import AddEmployee from "./components/admin/addEmployee/addEmployee";
import AccManagement from "./components/admin/accountManagement/accountManagement";
import ResidentAccManagement from "./components/resident/accountManagement/acccountManagement";
import ElectronicCabinet from "./components/resident/electronicCabinet/electronicCabinet";
import Invoice from "./components/resident/invoice/invoice";
import Reflect from "./components/resident/reflect/reflect";
import RegisterService from "./components/resident/registerService/registerService";
import ReUpdatePassword from "./components/resident/updatepassword/updatepassword";
import ServiceManagement from "./components/employee/serviceManagement/serviceManagement";
import ElectronicCabinetManagement from "./components/employee/electronicCabinetManagement/electronicCabinetManagement";
import InvoiceManagement from "./components/employee/invoiceManagement/invoiceManagement";
import ReflectManagement from "./components/employee/reflectManagement/reflectManagement";
import EAccountManagement from "./components/employee/acccountManagement/accountManagement";
import cookie from "react-cookies";
import MyUserReducer from "./reducers/MyUserReducer";
import AllUser from  './components/admin/allUser/allUser';
import AllEmployee from "./components/admin/allEmployee/allEmployee";
import AllSurvey from "./components/admin/allSurvey/allSurvey";
import AllService from "./components/admin/allService/allService";
import UpdateUser from "./components/admin/updateUser/updateUser";

export const MyUserContext = createContext();

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );

  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Routes>
          {/* admin */}
          <Route exact path="/" element={<Login />} />
          <Route path="/admin/home" element={<HomeAdmin />} />
          <Route path="/admin/adduser" element={<AddUser />} />
          <Route path="/admin/addsurvey" element={<AddSurvey />} />
          <Route path="/admin/alluser" element={<AllUser/>} />
          <Route path="/admin/allservice" element={<AllService/>} />
          <Route path="/admin/allsurvey" element={<AllSurvey/>} />
          <Route path="/admin/service" element={<Service />} />
          <Route path="/admin/addservice" element={<AddService />} />
          <Route path="/admin/allemployee" element={<AllEmployee/>} />
          <Route path="/admin/addemployee" element={<AddEmployee />} />
          <Route path="/admin/updateuser" element={<UpdateUser/>} />
          <Route path="/admin/statistic" element={<Statistic />} />
          <Route path="/admin/accmanagement" element={<AccManagement />} />

          <Route path="/admin/updatepassword" element={<UpdatePassWord />} />

          {/* resident */}
          <Route path="/admin/residentHome" element={<ResidentHome />} />
          <Route
            path="/resident/residentaccmanagement"
            element={<ResidentAccManagement />}
          />
          <Route
            path="/resident/electronicCabinet"
            element={<ElectronicCabinet />}
          />
          <Route path="/resident/invoice" element={<Invoice />} />
          <Route path="/resident/reflect" element={<Reflect />} />
          <Route
            path="/resident/registerservice"
            element={<RegisterService />}
          />
          <Route
            path="/resident/updatepassword"
            element={<ReUpdatePassword />}
          />

          {/* employee */}
          <Route path="/admin/employeeHome" element={<EmployeeHome />} />
          <Route
            path="/employee/servicemanagement"
            element={<ServiceManagement />}
          />
          <Route
            path="/employee/invoicemanagement"
            element={<InvoiceManagement />}
          />
          <Route
            path="/employee/reflectmanagement"
            element={<ReflectManagement />}
          />
          <Route
            path="/employee/eleccabinetmanagement"
            element={<ElectronicCabinetManagement />}
          />
          <Route
            path="/employee/eaccountmanagement"
            element={<EAccountManagement />}
          />
        </Routes>
        </BrowserRouter>
    </MyUserContext.Provider>
  );
};

export default App;
