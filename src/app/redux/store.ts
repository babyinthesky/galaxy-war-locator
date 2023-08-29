'use client'
import { applyMiddleware } from "redux";
import { configureStore, ThunkDispatch, AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers/rootReducer";
import memberShortListReducer from './slice';

// initial states here
// 

// middleware
const middleware = [thunk];

// assigning store to next wrapper
const store = configureStore({
  reducer: memberShortListReducer,
  devTools: true,
  middleware,
});

const makeStore = () => store

export const wrapper = createWrapper(makeStore);
// export type RootState = ReturnType<typeof reducer>;
// export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;