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
      <span> {renderText} </span>
    );
  }
  return (
    <div className="flex flex-row justify-start mb-2">
      <div className="mr-2 w-1/3">
        {title}
      </div>
      <div className="w-2/3">
        {renderInfoElement}
      </div>
    </div>
  );
}

const CardInfoModal = () => {
  const renderInfo = useAppSelector(selectSelectedMemberDetails);
  return (
    <AppModal>
      <div className="flex flex-row">
      <div className={'w-1/4 overflow-hidden mr-6'}>
        <Image
          src={renderInfo.image as string}
          alt={renderInfo.name as string}
          priority
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
        <div className="w-3/4 flex flex-col">
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
