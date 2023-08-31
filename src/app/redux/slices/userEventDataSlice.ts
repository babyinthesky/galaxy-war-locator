import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../types';
import { DetailedInfo, Location } from '../types';

const initialState= {
  myLocation: {
    lat: 0,
    long: 0,
  } as Location,
  highlightedMemberId: '',
  isModalOpen: false,
  selectedMemberDetails: {} as DetailedInfo,
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
  setLocation,
  setIsModalOpen,
  setSelectedMemberDetails,
} = userEventDataSlice.actions;
export const selectMyLocation = (state: RootState) => state.userEventData.myLocation;
export const selectHighlightedMemberId = (state: RootState) => state.userEventData.highlightedMemberId;
export const selectIsModalOpen = (state: RootState) => state.userEventData.isModalOpen;
export const selectSelectedMemberDetails = (state: RootState) => state.userEventData.selectedMemberDetails;

export default userEventDataSlice.reducer;
