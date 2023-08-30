export type MemberShortInfo = {
  id: string;
  lat: number;
  long: number;
}

export type MemberShortInfoForSorting = {
  distance: number;
} & MemberShortInfo;