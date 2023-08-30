import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type Location = {
  lat: number;
  long: number;
}

const initialState= {
  location: {
    lat: 0,
    long: 0,
  } as Location,
}

export const myLocationSlice = createSlice({
  name: 'memberShortListSlice',
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload;
    } 
  },
});

// export const selectMyLocation = (state: RootState) => state.myLocation;

export default myLocationSlice.reducer;
