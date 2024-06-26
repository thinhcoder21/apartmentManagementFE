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
import Statistic from "./components/admin/statistic/satistic";
import AddFee from "./components/admin/addFee/addFee";
import UpdatePassWord from "./components/admin/updatePassword/updatePassword";
import AddEmployee from "./components/admin/addEmployee/addEmployee";
import AccManagement from "./components/admin/accountManagement/accountManagement";
import ResidentAccManagement from "./components/resident/accountManagement/acccountManagement";
import ElectronicCabinet from "./components/resident/locker/locker";
import Invoice from "./components/resident/invoice/invoice";
import Reflect from "./components/resident/reflect/reflect";
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
import AllFee from "./components/admin/allFee/allFee";
import UpdateUser from "./components/admin/updateUser/updateUser";
import Response from "./components/resident/reponse/SurveyList";

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
          <Route exact path="/" element={<Login />} />
          
          {/* admin */}
          <Route path="/admin/home" element={<HomeAdmin />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/addsurvey" element={<AddSurvey />} />
            <Route path="/alluser" element={<AllUser/>} />
            <Route path="/allFee" element={<AllFee/>} />
            <Route path="/allsurvey" element={<AllSurvey/>} />
            <Route path="/addFee" element={<AddFee />} />
            <Route path="/allemployee" element={<AllEmployee/>} />
            <Route path="/addemployee" element={<AddEmployee />} />
            <Route path="/updateuser" element={<UpdateUser/>} />
            <Route path="/statistic" element={<Statistic />} />
            <Route path="/adminaccmanagement" element={<AccManagement />} />
            <Route path="/adminupdatepassword" element={<UpdatePassWord />} />

          {/* resident */}
          <Route path="/resident/home" element={<ResidentHome />} />
            <Route
              path="/residentaccmanagement"
              element={<ResidentAccManagement />}
            />
            <Route
              path="/electronicCabinet"
              element={<ElectronicCabinet />}
            />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/reflect" element={<Reflect />} />
            <Route path="/response" element={<Response />} />
            <Route
              path="/residentupdatepassword"
              element={<ReUpdatePassword />}
            />

          {/* employee */}
          <Route path="/employee/home" element={<EmployeeHome />} />
            <Route
              path="/servicemanagement"
              element={<ServiceManagement />}
            />
            <Route
              path="/invoicemanagement"
              element={<InvoiceManagement />}
            />
            <Route
              path="/reflectmanagement"
              element={<ReflectManagement />}
            />
            <Route
              path="/eleccabinetmanagement"
              element={<ElectronicCabinetManagement />}
            />
            <Route
              path="/eaccountmanagement"
              element={<EAccountManagement />}
            />
        </Routes>
        </BrowserRouter>
    </MyUserContext.Provider>
  );
};

export default App;
