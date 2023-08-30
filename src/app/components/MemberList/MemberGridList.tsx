import React from 'react';
import { useAppSelector } from '@/app/redux/hooks';
import { selectSortedShortList } from '@/app/redux/slices/sortedMemberShortListSlice';
import { selectMemberShortList } from '@/app/redux/slices/memberShortListSlice';
import MemberCard from './MemberCard';

const MemberGridList = () => {
  const { list: memberList } = useAppSelector(selectMemberShortList);
  const sortedList = useAppSelector(selectSortedShortList);
  const renderList = sortedList.length > 0 
    ? sortedList : memberList.map((member) => ({...member, distance: undefined}));
  return (
    <div className="h-80 lg:h-96 overflow-y-scroll my-4 px-2">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        {renderList.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
            distance={member.distance}
          />
        ))}
      </div>
    </div>
  )
}

export default MemberGridList;