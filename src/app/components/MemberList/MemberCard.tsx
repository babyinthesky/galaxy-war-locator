import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDataPrefixUrl } from '../../config';
import Image from 'next/image';
import { BsFillPersonVcardFill, BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { MdPersonSearch, MdOutlineHome } from 'react-icons/md';
import { FaMapMarkerAlt } from 'react-icons/fa';
import MemberCardTextLine from './MemberCardTextLine';

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

const roundDistance = (distance: number) => Number((distance/1000).toFixed(1));

const MemberCard = ({ id, distance } : Props) => {
  const [memberInfo, setMemberInfo] = useState<DetailedInfo | null>();

  useEffect(() => {
    if (id) {
      try{     
        axios.get(getDataPrefixUrl(id)).then((response) => {
          console.log(response.data);
          setMemberInfo(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [id])

  if (!memberInfo) {
    return null;
  }

  return (
    <div 
      className="flex flex-row rounded-lg px-3 py-4
      bg-gradient-to-b from-gray-600 to-gray-900
      shadow-gray-500 shadow-sm
      hover:shadow-cyan-500/50 hover:shadow-lg"
      onMouseEnter={() => {
        console.log('over', id);
        // TODO: update highlighted member id
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