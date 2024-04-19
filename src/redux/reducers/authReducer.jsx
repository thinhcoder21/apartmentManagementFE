import { LOGIN } from '../actionTypes';

const adminUserDataString = localStorage.getItem("adminUser");

const initialState = {
    adminData: adminUserDataString ? JSON.parse(adminUserDataString) : null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN:
        const { role } = action.data;
        switch (role) {
          case "ROLE_ADMIN":
            localStorage.setItem("adminUser", JSON.stringify(action.data));
            return {
              ...state,
              adminData: action.data,
            };
          default:
            return state;
        }
  
      default:
        return state;
    }
  };
  
  export default authReducer;
