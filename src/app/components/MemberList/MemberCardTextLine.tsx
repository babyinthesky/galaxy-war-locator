import React from 'react'
interface Props {
  text: string;
  icon: React.ReactElement;
}

const MemberCardTextLine = ({text, icon} : Props) => (
  <div className="flex flex-row items-center">
    <div className="mr-2">
      {icon}
    </div>
    <span>{text}</span>
  </div>
)

export default MemberCardTextLine;
