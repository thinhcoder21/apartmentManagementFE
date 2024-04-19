import {
  ADD_USER,
  ADD_SURVEY,
  DELETE_USER,
  DELETE_SURVEY,
  LOCK_USER,
  GET_ALL_USER,
  GET_USER_BY_ID,
  UPDATE_USER,
} from "../actionTypes";

const initialState = {
  authData: null,

  //edit
  updateUser: false,

  //add
  addUser: false,
  addSurvey: false,

  //getall
  getAllUser: [],

  //get_by_id
  getUserByID: [],

  //delete
  deleteUser: false,
  deleteSurvey: false,

  //lock
  lockUser: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return {
        ...state,
        getAllUser: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        addUser: action.payload,
      };
    case ADD_SURVEY:
      return {
        ...state,
        addSurvey: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload,
      };
    case DELETE_SURVEY:
      return {
        ...state,
        deleteSurvey: action.payload,
      };
    case LOCK_USER:
      return {
        ...state,
        lockUser: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        getUserByID: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload,
      };

    default: 
      return state;
  }
};
export default adminReducer;
