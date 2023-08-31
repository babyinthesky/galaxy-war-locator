import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { MemberShortInfoForSorting, DetailedInfo, MemberInfo } from '../types';

const initialState= {
  list: [] as MemberInfo[],
}

export const memberListSlice = createSlice({
  name: 'memberListSlice',
  initialState,
  reducers: {
    setSortedMemberList: (state, action) => {
      state.list = action.payload;
    },
    updateDataIntoMemberList: (state, action) => {
      const memberId = action.payload.id;
      const cloneList = state.list.slice();
      const index = cloneList.findIndex((member) => member.id === memberId);
      if (index >= 0) {
        cloneList[index] = {
          ...cloneList[index],
          ...action.payload,
        }
      } else {
        cloneList.push(action.payload);
      }
      state.list = cloneList;
    }
  },
});
export const { setSortedMemberList, updateDataIntoMemberList } = memberListSlice.actions;
export const selectSortedMemberList = (state: RootState) => state.memberList.list;

export default memberListSlice.reducer;
