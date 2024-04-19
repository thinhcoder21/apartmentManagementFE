import { combineReducers } from "redux";
import adminReducer from "./adminReducer";
import authReducer from "./authReducer";

export default combineReducers({
  admin: adminReducer,
  auth: authReducer,
});
