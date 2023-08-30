import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type MemberShortInfo = {
  id: string;
  lat: number;
  long: number;
}

export type MemberShortInfoForSorting = {
  distance: number;
} & MemberShortInfo;