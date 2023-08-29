import { Reducer } from "redux";
import { MEMBER_SHORT_LIST } from "../types";

export type MemberShortInfo = {
  id: string;
  lat: string;  // number
  lon: string; // number
}

type MemberShortListAction = {
  type: string;
  payload: MemberShortInfo[]
};

// export type MemberDetailedInfo = {

// }

const initialState = {
  memberShortList: [] as MemberShortInfo[],
  // memberDetailedList: [] as ,
};

const reducer: Reducer<typeof initialState, MemberShortListAction> = (
  state = initialState,
	action,
) => {
  switch (action.type) {
		case MEMBER_SHORT_LIST:
			return {
				...state,
				memberShortList: action.payload,
			};
    default:
      return {
        ...state,
      }
  }
}

export default reducer;
