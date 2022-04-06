import "../styles/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

type VitalSigntsArray = {
  FC: string;
  FR: string;
  PA: string;
  TC: string;
  date: string;
  idResident: string;
  pain: string;
  time: string;
  type: string;
};

export function Table(list: any) {
  // <th>Parte Do Dia </th>
  //         {/* --- */}
  //         <th>Temp. Corporal (TC)</th>
  //         <th>Freq. Cardíaca (FC)</th>
  //         <th>Pres. Arterial (PA)</th>
  //         <th>Freq. Respiratória (FR)</th>

  return (
    <>
      {list && list.list && list.list.length > 0 ? (
        <table>
          <tr>
            <th>Parte Do Dia/Horario </th>
            {/* --- */}
            <th>(TC)</th>
            <th>(FC)</th>
            <th>(PA)</th>
            <th>(FR)</th>
            <th>Dor</th>
            <th>Cuidador</th>
          </tr>

          {list &&
            list.list &&
            list.list.map((row: any) => (
              <tr>
                <td>
                  <div className="content-medicated">
                    <span>
                      {row.type === "0"
                        ? "Manhã"
                        : row.type === "1"
                        ? "Tarde"
                        : "Noite"}
                    </span>

                    <div className="hours">
                      <span> {row.time}</span>
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                  </div>
                </td>

                {/* --- */}
                <td align="left">{row.TC} </td>
                <td align="left">{row.FC}</td>
                <td align="left">{row.PA} </td>
                <td align="left">{row.FR} </td>
                <td align="left">{row.pain} </td>
                <td align="left">
                  {row.userRespon && (
                    <div className="content-avatar">
                      <img src={row.userRespon.avatar} alt="" className="" />
                      <span className=""> {row.userRespon.name}</span>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </table>
      ) : (
        <span className="">Nenhuma Informação Encontrada Para Dia</span>
      )}
    </>
  );
}
