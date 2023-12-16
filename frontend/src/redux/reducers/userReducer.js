import {
  LOG_IN_USER,
  LOG_OUT_USER
} from "../actions/userAction";
// Retrieving the string
let retString = localStorage.getItem("user")

// Retrieved array
let user = JSON.parse(retString)
const INITIAL_STATE = { user: user ? user : undefined };

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
   
    case LOG_IN_USER :
     
        localStorage.setItem("user", JSON.stringify(action.payload));
        return{...state, user : action.payload}
       

      case LOG_OUT_USER:
      console.log("log")
      localStorage.removeItem("user");
      return{...state, user : undefined}
   
    default:
      return state;
  }
};
