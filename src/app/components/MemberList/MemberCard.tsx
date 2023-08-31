import React, { useEffect, useState } from 'react';
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
import { DetailedInfo } from '@/app/redux/types';

const AVATAR_SIZE = 70;

interface Props {
  id: string;
  distance?: number;
}

const MemberCard = ({ id, distance } : Props) => {
  const [memberInfo, setMemberInfo] = useState<DetailedInfo | null>();
  const dispatch = useAppDispatch();

  useEffect(() => {
      try{     
        axios.get(getDataPrefixUrl(id)).then((response) => {
          setMemberInfo(response.data);
        });
      } catch (error) {
        console.error(error);
      }
  }, [])

  if (!memberInfo) {
    return null;
  }

  return (
    <div
      className="flex flex-row rounded-lg px-3 py-4
        bg-gradient-to-b from-neutral-600 to-neutral-800
        shadow-gray-500/50 shadow-sm
        hover:drop-shadow-glow"
      onMouseEnter={() => {
        dispatch(setHighlightedMemberId(id));
      }}
      onMouseLeave={() => {
        dispatch(setHighlightedMemberId(''));
      }}
      onMouseDown={() => {
        dispatch(setIsModalOpen(true));
        dispatch(setSelectedMemberDetails(memberInfo));
      }}
    >
      <div className={`rounded-full h-[70px] overflow-hidden`}>
        <Image
          src={memberInfo.image as string}
          alt={memberInfo.name as string}
          priority
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      </div>
      <div className="ml-6 text-slate-300 flex flex-col">
        <MemberCardTextLine
          text={memberInfo.name as string}
          icon={<BsFillPersonVcardFill />}
        />
        {memberInfo.gender === 'male' ? (
          <BsGenderMale />
        ) : (
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
        {distance && (
          <MemberCardTextLine
            text={`${roundDistance(distance).toString()} km`}
            icon={<FaMapMarkerAlt />}
          />
        )}
      </div>
    </div>
  )
}

export default MemberCard;