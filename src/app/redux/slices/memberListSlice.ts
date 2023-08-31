import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { MemberInfo, MemberListWithDistance } from '../types';

// I use merge sort here, in case of big array this way is faster
const sortListByDistance = (listToSort: MemberListWithDistance, sortedList: MemberListWithDistance) => {
  const listLength = listToSort.length;
  listToSort.forEach((member) => {
    if (sortedList.length === 0) {
      sortedList.push(member);
    } else {
      for (let j = 0; j < listLength; j = j + 1) {
        if (sortedList[j]) {
          if (member.distance <= sortedList[j].distance) {
            sortedList.splice(j, 0, member);
            break;
          }
            continue;
        } else {
          sortedList.push(member);
          break;
        }
      }
    }
  });
}

const initialState= {
  list: [] as MemberInfo[],
}

export const memberListSlice = createSlice({
  name: 'memberListSlice',
  initialState,
  reducers: {
    sortMemberList: (state, action) => {
      const memberListWithDistance = action.payload;
      const sortedList = [] as MemberListWithDistance;
      sortListByDistance(memberListWithDistance, sortedList);
      state.list = sortedList;
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
export const { sortMemberList, updateDataIntoMemberList } = memberListSlice.actions;
export const selectMemberList = (state: RootState) => state.memberList.list;

export default memberListSlice.reducer;
