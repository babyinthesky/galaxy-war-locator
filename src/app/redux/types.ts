import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import { store } from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type MemberShortInfo = {
  id: string;
  lat: number;
  long: number;
}

export type DetailedInfo = {
  [key: string]: string | string[] | undefined | number;
}

export type MemberInfo = MemberShortInfo & DetailedInfo & {
  distance?: number;
};

export type MemberWithDistance = MemberInfo & {distance: number};

export type MemberListWithDistance = MemberWithDistance[];

export type Location = {
  lat: number;
  long: number;
}