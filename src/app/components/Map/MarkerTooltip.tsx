import { Tooltip } from "react-leaflet";
import { roundDistance } from '@/app/util';
import { MemberInfo } from "@/app/redux/types";

interface Props {
  memberInfo: MemberInfo;
}

const MarkerTooltip = ({memberInfo} : Props) => (
  <Tooltip className="p-1">
      <div className="flex flex-col">
        <span>{memberInfo.name}</span>
        {memberInfo.distance && (
          <span>{`${roundDistance(memberInfo.distance)} km`}</span>
        )}
      </div>
  </Tooltip>
)

export default MarkerTooltip;
