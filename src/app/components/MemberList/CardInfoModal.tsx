import React from 'react';
import { useAppSelector } from "@/app/redux/hooks";
import { BsLink } from 'react-icons/bs';
import AppModal from "../AppModal";
import Image from "next/image";
import { selectSelectedMemberDetails } from "@/app/redux/slices/userEventDataSlice";
import Link from "next/link";

interface Props {
  title: string;
  info: string | string[] | number | undefined;
}

const TextLine = ({title, info} : Props) => {
  let renderText = Array.isArray(info) ? info.join(',') : info;
  let renderInfoElement: React.ReactElement;
  if (title === 'image') {
    return null
  }
  if (title === 'wiki' && typeof renderText === 'string') {
    renderInfoElement = (
      <Link href={renderText}>
        <BsLink className="text-xl"/>
      </Link>
    );
  } else {
    renderInfoElement = (
      <span className="flex-2 text-ellipsis"> {renderText} </span>
    );
  }
  return (
    <div className="flex w-full flex-row justify-start mb-2">
      <div className="mr-2 flex-1 text-ellipsis">
        {title}
      </div>
      <div className="flex-2 text-ellipsis">
        {renderInfoElement}
      </div>
    </div>
  );
}

const CardInfoModal = () => {
  const renderInfo = useAppSelector(selectSelectedMemberDetails);
  return (
    <AppModal>
      <div className="flex xs:flex-col sm:flex-row xs:items-center sm:items-start">
        <div className={'flex-1 overflow-hidden xs:mr-0 sm:mr-6'}>
          <div className="w-full xs:h-[70%] sm:h-auto">
          <Image
            src={renderInfo.image as string}
            alt={renderInfo.name as string}
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          </div>
        </div>
        <div className="flex flex-3 flex-col xs:mt-4 sm:mt-0">
          {Object.keys(renderInfo).map((key) => (
            <TextLine
              key={key}
              title={key}
              info={renderInfo[key]}
            />
          ))}
        </div>
      </div>
    </AppModal>
  )
}

export default CardInfoModal;
