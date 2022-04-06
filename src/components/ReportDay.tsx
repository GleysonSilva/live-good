import "../styles/reportDay.scss";
import moment from "moment";
type ReportDayArray = {};

export function ReportDay(list: any) {
  return (
    <>
      {list && list.list && list.list.length > 0 ? (
        <div className="content-rd">
          {list.list.map((row: any) => (
            <div className="content-report">
              <div className="content-avatar">
                <img src={row.userRespon.avatar} alt="" />
                <span> {row.userRespon.name}</span>
              </div>

              <span>"{row.description}"</span>
              <span>{moment(row.data).format("DD/MM/YYYY H:mm")}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="">Nenhuma Informação Encontrada Este Dia</span>
      )}
    </>
  );
}
