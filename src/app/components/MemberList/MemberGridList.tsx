import React, { useEffect } from 'react';
import { useAppSelector } from '@/app/redux/hooks';
import { selectSortedMemberList } from '@/app/redux/slices/memberListSlice';
import { selectMemberShortList } from '@/app/redux/slices/memberShortListSlice';
import { MemberInfo } from '@/app/redux/types';
import MemberCard from './MemberCard';

const MemberGridList = () => {
  const { list: memberShortList } = useAppSelector(selectMemberShortList);
  const sortedList = useAppSelector(selectSortedMemberList);

  const renderList = sortedList.length > 0 
    ? sortedList : memberShortList.map((member) => ({...member, distance: undefined}));
  
  console.log({renderList});
  return (
    <div className="h-80 lg:h-96 overflow-y-scroll my-4 px-2">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 py-4 px-2">
        {renderList.map((member) => (
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