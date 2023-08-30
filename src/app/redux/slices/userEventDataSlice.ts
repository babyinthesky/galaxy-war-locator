import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../types';

type Location = {
  lat: number;
  long: number;
}

const initialState= {
  myLocation: {
    lat: 0,
    long: 0,
  } as Location,
  highlightedMemberId: '',
}

export const userEventDataSlice = createSlice({
  name: 'userEventSlice',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.myLocation = action.payload;
    },
    setHighlightedMemberId: (state, action) => {
      state.highlightedMemberId = action.payload;
    }
  },
});

export const { setHighlightedMemberId, setLocation } = userEventDataSlice.actions;
export const selectMyLocation = (state: RootState) => state.userEventData.myLocation;
export const selectHighlightedMemberId = (state: RootState) => state.userEventData.highlightedMemberId;

export default userEventDataSlice.reducer;
