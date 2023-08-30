import { combineReducers } from "redux";
import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import memberShortListReducer from './slices/memberShortListSlice';
import sortedMemberShortListReducer from "./slices/sortedMemberShortListSlice";

const rootReducer = combineReducers({
  memberShortList: memberShortListReducer,
  sortedShortList: sortedMemberShortListReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;