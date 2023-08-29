import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from './store';
import axios from 'axios';
import { SECRET_URL } from '../config';

// Define a type for the slice state
type MemberShortInfo = {
  id: string;
  lat: string;  // number
  lon: string; // number
}

export const getMemberShortList = createAsyncThunk(
  "getMemberShortList", 
  async () => {
    try {
      const response = await axios.get(SECRET_URL);
      return response.data;
    } catch (error) {
      console.error(error);
    }
});

// Define the initial state using that type
const initialState= {
  memberShortInfoList: [] as MemberShortInfo[],
  isLoading: false,
  hasError: false,
}

export const memberShortListSlice = createSlice({
  name: 'memberShortListSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberShortList.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getMemberShortList.fulfilled, (state, action) => {
        state.memberShortInfoList = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getMemberShortList.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
  },
});


// Other code such as selectors can use the imported `RootState` type
export const selectMemberShortInfoList = (state: RootState) => state.memberShortInfoList;
export const selectMemberShortInfoLoadingState = (state: RootState) => state.isLoading;
export const selectMemberShortInfoErrorState = (state: RootState) => state.hasError;

export default memberShortListSlice.reducer