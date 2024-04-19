import "./index.css";
import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/login/login";
import HomeAdmin from "./components/admin/HomeAdmin";
import ResidentHome from "./components/resident/ResidentHome";
import EmployeeHome from "./components/employee/EmployeeHome";
import AddUser from "./components/admin/addUser/addUser";
import AddSurvey from "./components/admin/addSurvey/addSurvey";
import GetListUser from "./components/admin/getListUser/getListUser";
import Service from "./components/admin/Service/existsService";
import Statistic from "./components/admin/statistic/satistic";
import AddService from "./components/admin/addService/addService";
import UpdatePassWord from "./components/admin/updatePassword/updatePassword";
import AddEmployee from './components/admin/addEmployee/addEmployee'
import AccManagement from './components/admin/accountManagement/accountManagement'
import ResidentAccManagement from './components/resident/accountManagement/acccountManagement'
import ElectronicCabinet from './components/resident/electronicCabinet/electronicCabinet'
import Invoice from './components/resident/invoice/invoice';
import Reflect from './components/resident/reflect/reflect';
import RegisterService from './components/resident/registerService/registerService';
import ReUpdatePassword from './components/resident/updatepassword/updatepassword';
import ServiceManagement from "./components/employee/serviceManagement/serviceManagement";
import ElectronicCabinetManagement from "./components/employee/electronicCabinetManagement/electronicCabinetManagement";
import InvoiceManagement from "./components/employee/invoiceManagement/invoiceManagement";
import ReflectManagement from "./components/employee/reflectManagement/reflectManagement";
import EAccountManagement from "./components/employee/acccountManagement/accountManagement";

function App() {
  return (
    <Routes>
      {/* admin */}
      {<Route exact path="/" element={<Login />} />}
      <Route path="/admin/home" element={<HomeAdmin />} />
      <Route path="/admin/adduser" element={<AddUser />} />
      <Route path="/admin/addsurvey" element={<AddSurvey />} />

      <Route path="/admin/service" element={<Service />} />
      <Route path="/admin/addservice" element={<AddService />} />

      <Route path="/admin/addemployee" element={<AddEmployee />} />

      <Route path="/admin/user" element={<GetListUser />} />
      <Route path="/admin/statistic" element={<Statistic />} />
      <Route path="/admin/accmanagement" element={<AccManagement />} />

      <Route path="/admin/updatepassword" element={<UpdatePassWord />} />

      {/* resident */}
      <Route path="/admin/residentHome" element={<ResidentHome />} />
      <Route path="/resident/residentaccmanagement" element={<ResidentAccManagement />} />
      <Route path="/resident/electronicCabinet" element={<ElectronicCabinet />} />
      <Route path="/resident/invoice" element={<Invoice />} />
      <Route path="/resident/reflect" element={<Reflect />} />
      <Route path="/resident/registerservice" element={<RegisterService />} />
      <Route path="/resident/updatepassword" element={<ReUpdatePassword />} />



      {/* employee */}
      <Route path="/admin/employeeHome" element={<EmployeeHome />} />
      <Route path="/employee/servicemanagement" element={<ServiceManagement />} />
      <Route path="/employee/invoicemanagement" element={<InvoiceManagement />} />
      <Route path="/employee/reflectmanagement" element={<ReflectManagement />} />
      <Route path="/employee/eleccabinetmanagement" element={<ElectronicCabinetManagement />} />
      <Route path="/employee/eaccountmanagement" element={<EAccountManagement />} />


    </Routes>
  );
}

export default App;
