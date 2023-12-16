const redux = require("redux");
const {userReducer } = require("./reducers/userReducer");

export const store = redux.createStore(userReducer);