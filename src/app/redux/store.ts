import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import memberShortListReducer from './slices/memberShortListSlice';
import memberListReducer from "./slices/memberListSlice";
import userEventDataReducer from "./slices/userEventDataSlice";

const rootReducer = combineReducers({
  memberShortList: memberShortListReducer,
  memberList: memberListReducer,
  userEventData: userEventDataReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});