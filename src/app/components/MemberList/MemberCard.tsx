import React, { useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BsFillPersonVcardFill, BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { MdPersonSearch, MdOutlineHome } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MemberCardTextLine from './MemberCardTextLine';
import { useAppDispatch } from '@/app/redux/hooks';
import { setHighlightedMemberId, setIsModalOpen, setSelectedMemberDetails } from '@/app/redux/slices/userEventDataSlice';
import { roundDistance } from '@/app/util';
import { getDataPrefixUrl } from '../../config';
import { MemberInfo } from '@/app/redux/types';
import { updateDataIntoMemberList } from '@/app/redux/slices/memberListSlice';

interface Props {
  memberInfo: MemberInfo;
}

const MemberCard = ({ memberInfo } : Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(memberInfo?.id){
      try{     
        axios.get(getDataPrefixUrl(memberInfo.id)).then((response) => {
          const data = response.data as MemberInfo;
          dispatch(updateDataIntoMemberList({
            ...memberInfo,
            ...data,
          }));
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [])

  return (
    <div
      className="flex sm:flex-row xs:flex-col rounded-lg px-3 py-4
        bg-gradient-to-b from-neutral-600 to-neutral-800
        shadow-gray-500/50 shadow-sm cursor-pointer
        hover:drop-shadow-glow"
      onMouseEnter={() => {
        dispatch(setHighlightedMemberId(memberInfo.id));
      }}
      onMouseLeave={() => {
        dispatch(setHighlightedMemberId(''));
      }}
      onClick={() => {
          dispatch(setIsModalOpen(true));
          dispatch(setSelectedMemberDetails(memberInfo));
      }}
      role="gridcell"
    >
      <div className={`rounded-full w-[70px] h-[70px] overflow-hidden`}>
        {memberInfo.image && (
          <Image
            src={memberInfo.image as string}
            alt={memberInfo.name as string}
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: 'auto', height: 'auto' }}
          />
        )}
      </div>
      <div className="ml-6 text-neutral-300 flex flex-col">
        <MemberCardTextLine
          text={memberInfo.name as string}
          icon={<BsFillPersonVcardFill />}
        />
        {memberInfo.gender === 'male' && (
          <BsGenderMale />
        )}
        {memberInfo.gender === 'female' && (
          <BsGenderFemale />
        )}
        <MemberCardTextLine
          text={memberInfo.species as string}
          icon={<MdPersonSearch />}
        />
        <MemberCardTextLine
          text={memberInfo.homeworld as string}
          icon={<MdOutlineHome />}
        />
        {memberInfo.distance && (
          <MemberCardTextLine
            text={`${roundDistance(memberInfo.distance).toString()} km`}
            icon={<FaMapMarkerAlt />}
          />
        )}
      </div>
    </div>
  )
}

export default MemberCard;