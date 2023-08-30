import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getDataPrefixUrl } from '../../config';
import Image from 'next/image';

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
    <div className="h-50, w-100">
      <Image
        src={memberInfo.image}
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          alt="Next.js Logo"
          width={50}
          height={50}
          priority
      />
      <span>{memberInfo.name}</span>
    </div>
  )
}

export default MemberCard;