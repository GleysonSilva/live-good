import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faClock } from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

import "../styles/table.scss";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

type MedicineArray = {
  cod: string;
  data: string;
  id: string;
  medicated: any;
  name: string;
  userRespon?: {};
};

type ITableProps = {
  list: MedicineArray[] | undefined;
  onGetList: () => void;
};

export const TableMedicine: React.FC<ITableProps> = ({ list, onGetList }) => {
  const { user } = useAuth();

  async function handleSetMedicated(id: String) {
    // await database.ref(`medicine-residents/${id}/userRespon`).push(user);

    await database.ref(`medicine-residents/${id}`).update({
      medicated: moment().format("YYYY-MM-DD H:mm:ss"),
      userRespon: user,
    });

    onGetList();
  }

  return (
    <>
      {list && list.length > 0 ? (
        <table>
          <tr>
            <th>Cod.</th>
            <th>Name</th>
            {/* --- */}
            <th>Data</th>
            <th>Horario</th>

            <th>Ação</th>
            <th>Cuidador</th>
          </tr>

          {list &&
            list.map((row: any) => (
              <tr key={row.id}>
                <td>{row.cod ? row.cod : "Não infor."}</td>
                <td>{row.name} </td>

                <td align="left">{moment(row.data).format("DD/MM/YYYY")} </td>
                <td align="left">{moment(row.data).format("H:mm")}</td>
                <td align="left">
                  {user ? (
                    !row.medicated ? (
                      <button
                        className="button-medicated"
                        onClick={() => handleSetMedicated(row.id)}
                      >
                        <FontAwesomeIcon icon={faCircleCheck} />{" "}
                        <span>Remedio Medicado</span>
                      </button>
                    ) : (
                      <div className="content-medicated">
                        <span>Medicado as</span>
                        <div className="hours">
                          <span>{moment(row.medicated).format("H:mm:ss")}</span>
                          <FontAwesomeIcon icon={faClock} />
                        </div>
                      </div>
                    )
                  ) : (
                    "-"
                  )}
                </td>
                <td>
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
};
