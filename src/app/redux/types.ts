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

// export type MemberExtraInfo = {
//   id: string;
//   name?: string;
//   height?: string;
//   mass?: string;
//   gender?: string;
//   homeworld?: string;
//   wiki?: string;
//   image?: string;
//   born?: string;
//   died?: string;
//   diedLocation?: string;
//   species?: string;
//   hairColor?: string;
//   eyeColor?: string;
//   skinColor?: string;
//   cybernetics?: string;
//   affilications?: string[];
//   masters?: string[];
//   apprentices?: string[];
//   formerAffilications?: string[];
// }

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