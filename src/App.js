import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { createContext, useReducer } from "react";
import cookie from "react-cookies";
import Login from "./components/login";
import ResidentHome from "./components/resident/ResidentHome";
import ResidentAccManagement from "./components/resident/accountManagement/acccountManagement";
import ElectronicCabinet from "./components/resident/locker/locker";
import Invoice from "./components/resident/invoice/invoice";
import Reflect from "./components/resident/reflect/reflect";
import ReUpdatePassword from "./components/resident/updatepassword/updatepassword";
import MyUserReducer from "./reducers/MyUserReducer";
import Response from "./components/resident/reponse/SurveyList";
import { MyDispatchContext, MyUserContext } from "./configs/Context";

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );

  return (
    <BrowserRouter>
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <Routes>
            <Route path="/" element={<ResidentHome />} />
            <Route exact path="/login" element={<Login />} />
            {/* resident */}
            <Route path="/resident/home" element={<ResidentHome />} />
            <Route
              path="/residentaccmanagement"
              element={<ResidentAccManagement />}
            />
            <Route path="/electronicCabinet" element={<ElectronicCabinet />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/reflect" element={<Reflect />} />
            <Route path="/response" element={<Response />} />
            <Route
              path="/residentupdatepassword"
              element={<ReUpdatePassword />}
            />
          </Routes>
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
