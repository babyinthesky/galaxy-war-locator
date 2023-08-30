import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import memberShortListReducer from './slices/memberShortListSlice';
import sortedMemberShortListReducer from "./slices/sortedMemberShortListSlice";
import userEventDataReducer from "./slices/userEventDataSlice";

const rootReducer = combineReducers({
  memberShortList: memberShortListReducer,
  sortedShortList: sortedMemberShortListReducer,
  userEventData: userEventDataReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});