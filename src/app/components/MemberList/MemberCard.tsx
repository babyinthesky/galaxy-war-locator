import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { BsFillPersonVcardFill, BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { MdPersonSearch, MdOutlineHome } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MemberCardTextLine from './MemberCardTextLine';
import { useAppDispatch } from '@/app/redux/hooks';
import { setHighlightedMemberId } from '@/app/redux/slices/userEventDataSlice';
import { roundDistance } from '@/app/util';
import { getDataPrefixUrl } from '../../config';

const AVATAR_SIZE = 70;

interface Props {
  id: string;
  distance?: number;
}

type DetailedInfo = {
  id: string;
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born: string;
  died: string;
  diedLocation: string;
  species: string;
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
        bg-gradient-to-b from-gray-600 to-gray-900
        shadow-gray-500/50 shadow-sm
        hover:drop-shadow-glow"
      onMouseEnter={() => {
        dispatch(setHighlightedMemberId(id));
      }}
      onMouseLeave={() => {
        dispatch(setHighlightedMemberId(''));
      }}
    >
      <div className={`rounded-full h-[70px] overflow-hidden`}>
        <Image
          src={memberInfo.image}
          alt={memberInfo.name}
          priority
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      </div>
      <div className="ml-6 text-slate-300 flex flex-col">
        <MemberCardTextLine
          text={memberInfo.name}
          icon={<BsFillPersonVcardFill />}
        />
        {memberInfo.gender === 'male' ? (
          <BsGenderMale />
        ) : (
          <BsGenderFemale />
        )}
        <MemberCardTextLine
          text={memberInfo.species}
          icon={<MdPersonSearch />}
        />
        <MemberCardTextLine
          text={memberInfo.homeworld}
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