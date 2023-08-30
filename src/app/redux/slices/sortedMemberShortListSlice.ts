import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { MemberShortInfoForSorting } from '../types';

const initialState= {
  list: [] as MemberShortInfoForSorting[],
}

export const sortedMemberShortListSlice = createSlice({
  name: 'sortedMemberShortListSlice',
  initialState,
  reducers: {
    setSortedMemberShortList: (state, action) => {
      state.list = action.payload;
    }
  },
});
export const { setSortedMemberShortList } = sortedMemberShortListSlice.actions;
export const selectSortedShortList = (state: RootState) => state.sortedShortList.list;

export default sortedMemberShortListSlice.reducer;
