import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDataPrefixUrl } from '../../config';
import Image from 'next/image';
import { BsFillPersonVcardFill, BsGenderMale, BsGenderFemale } from 'react-icons/bs';
import { MdPersonSearch, MdOutlineHome } from 'react-icons/md';
import MemberCardTextLine from './MemberCardTextLine';

const AVATAR_SIZE = 70;

interface Props {
  id: string;
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

const MemberCard = ({ id } : Props) => {
  const [memberInfo, setMemberInfo] = useState<DetailedInfo | null>();
  useEffect(() => {
    if (id) {
      try{     
        axios.get(getDataPrefixUrl(id)).then((response) => {
          console.log(response.data);
          setMemberInfo(response.data);
          // setMemberInfo(JSON.parse(response.data));
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, [id])
  // TODO: fetch detailed data

  if (!memberInfo) {
    return null;
  }

  return (
    <div 
      className="flex flex-row bg-gray-800 rounded-lg px-2 py-4
      shadow-gray-500 shadow-sm
      hover:shadow-cyan-500/50 hover:shadow-lg"
    >
      <div className={`rounded-full h-[${AVATAR_SIZE}px] overflow-hidden`}>
        <Image
          src={memberInfo.image}
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          alt={memberInfo.name}
          priority
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
        />
      </div>
      <div className="ml-3 text-slate-300 flex flex-col">
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
      </div>
    </div>
  )
}

export default MemberCard;