import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { DetailedInfo } from '../types';

const initialState= {
  highlightedMemberId: '',
  isModalOpen: false,
  selectedMemberDetails: {} as DetailedInfo,
}

export const userEventDataSlice = createSlice({
  name: 'userEventSlice',
  initialState,
  reducers: {
    setHighlightedMemberId: (state, action) => {
      state.highlightedMemberId = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setSelectedMemberDetails: (state, action) => {
      state.selectedMemberDetails = action.payload;
    }
  },
});

export const {
  setHighlightedMemberId,
  setIsModalOpen,
  setSelectedMemberDetails,
} = userEventDataSlice.actions;

export const selectHighlightedMemberId = (state: RootState) => state.userEventData.highlightedMemberId;
export const selectIsModalOpen = (state: RootState) => state.userEventData.isModalOpen;
export const selectSelectedMemberDetails = (state: RootState) => state.userEventData.selectedMemberDetails;

export default userEventDataSlice.reducer;
