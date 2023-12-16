export const LOG_IN_USER = "Login user";
export const LOG_OUT_USER = "Logout user";

// action creators
export const logInUser = (user) => ({ type: LOG_IN_USER, payload: user });
export const logOutUser = () => ({ type: LOG_OUT_USER });