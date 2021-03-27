import { combineReducers } from "redux";
import { authReducer } from "./auth";

export const rootReducer = combineReducers({
   user: authReducer,
});
