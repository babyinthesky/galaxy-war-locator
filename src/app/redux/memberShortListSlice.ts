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

const initialState= {
  list: [] as MemberShortInfo[],
  isLoading: false,
  hasError: false,
}

export const getMemberShortList = createAsyncThunk(
  "getMemberShortList", 
  async () => {
    try {
      const response = await axios.get(SECRET_URL);
      const message = atob(response.data.message);
      return message;
    } catch (error) {
      console.error(error);
    }
});

export const memberShortListSlice = createSlice({
  name: 'memberShortListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMemberShortList.pending, (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getMemberShortList.fulfilled, (state, action) => {
        if (action.payload) {
          state.list = JSON.parse(action.payload);
        }
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getMemberShortList.rejected, (state, action) => {
        state.hasError = true;
        state.isLoading = false;
      })
  },
});

export const selectMemberShortList = (state: RootState) => state.memberShortList;
// export const selectMemberShortListLoadingState = (state: RootState) => state.memberShortList.isLoading;
// export const selectMemberShortListErrorState = (state: RootState) => state.memberShortList.hasError;

export default memberShortListSlice.reducer;
