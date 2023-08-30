import React from 'react';
import { useAppSelector } from '@/app/redux/hooks';
import { selectSortedShortList } from '@/app/redux/slices/sortedMemberShortListSlice';
import { selectMemberShortList } from '@/app/redux/slices/memberShortListSlice';
import MemberCard from './MemberCard';

const MemberGridList = () => {
  const { list: memberList } = useAppSelector(selectMemberShortList);
  const sortedList = useAppSelector(selectSortedShortList);
  // TODO: load id list and location
  // members
  const renderList = sortedList.length > 0 ? sortedList : memberList
  return (
    <div className="h-80 lg:h-96 overflow-y-scroll">
      <div className="grid grid-cols-2">
        {renderList.map((member) => (
          <MemberCard
            key={member.id}
            id={member.id}
          />
        ))}
      </div>
    </div>
  )
}

export default MemberGridList;