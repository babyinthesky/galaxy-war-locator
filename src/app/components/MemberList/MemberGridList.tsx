import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { selectMemberList, setMemberList } from '@/app/redux/slices/memberListSlice';
import { selectMemberShortList } from '@/app/redux/slices/memberShortListSlice';
import MemberCard from './MemberCard';

const MemberGridList = () => {
  const dispatch = useAppDispatch();
  const { list: memberShortList } = useAppSelector(selectMemberShortList);
  const memberList = useAppSelector(selectMemberList);

  useEffect(() => {
    // Initialize member list from the member short data list
    if (memberList.length === 0 && memberShortList.length > 0) {
      dispatch(setMemberList(memberShortList));
    }
  }, [memberList, memberShortList]);
  
  return (
    <div className="h-80 lg:h-96 overflow-y-scroll my-4 px-2">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 py-4 px-2">
        {memberList.map((member) => (
          <MemberCard
            key={member.id}
            memberInfo={member}
          />
        ))}
      </div>
    </div>
  )
}

export default MemberGridList;