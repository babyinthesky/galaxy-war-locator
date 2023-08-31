import { Tooltip } from "react-leaflet";
import { roundFloat } from '@/app/util';

export type MarkerData = {
  id?: string;
  lat: number,
  long: number,
}

interface TableRowProps {
  title: string;
  info?: string | number;
}

interface Props {
  markerData: MarkerData;
}

const TableRow = ({title, info} : TableRowProps) => {
  if (!info) {
    return null;
  }

  return(
    <tr>
      <td>
        <span>{title}</span>
      </td>
      <td>
        <span>{info}</span>
      </td>
    </tr>
  )
}

const MarkerTooltip = ({markerData} : Props) => (
  <Tooltip>
        <div className="flex flex-col">
          <table>
            <tbody>
              <TableRow
                title="ID:"
                info={markerData.id}
              />
              <TableRow
                title="Lat:"
                info={roundFloat(markerData.lat)}
              />
              <TableRow
                title="Lon:"
                info={roundFloat(markerData.long)}
              />
            </tbody>
          </table>
        </div>
      </Tooltip>
)

export default MarkerTooltip;
