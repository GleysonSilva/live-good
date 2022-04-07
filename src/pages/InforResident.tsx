import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo1.png";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";

//compoments
import { UserResidentInfor } from "../components/UserResidentInfor";
import { Button } from "../components/Button";
import { Title } from "../components/Title";
import { Table } from "../components/Table";
import { TableMedicine } from "../components/TableMedicine";
import { ReportDay } from "../components/ReportDay";

// modal
import { ModalAddVitalSigns } from "../components/ModalAddVitalSigns";
import { ModalAddMedicine } from "../components/ModalAddMedicine";
import { ModalAddReportDay } from "../components/ModalAddReportDay";

// icon
import {
  faPills,
  faReceipt,
  faHeartPulse,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";

import moment from "moment";

//style scss
import "../styles/InforPatient.scss";

type RoomParams = {
  id: string;
};

type ResidentArray = {
  id: string;
  name: string;
  birthDate: string;
  bloodType: string;
  height: string;
  sexo: string;
  weight: string;
  medicalPicture: string;
};

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
type ReportDayArray = {
  idResident: string;
  description: string;
  data: string;
  userRespon: {};
};

type MedicineArray = {
  name: string;
  cod: string;
  data: string;
};

type FirebaseVitalSignsArray = Record<
  number,
  {
    FC: string;
    FR: string;
    PA: string;
    TC: string;
    date: string;
    idResident: string;
    pain: string;
    time: string;
    type: string;
    userRespon: {};
  }
>;
type MedicineSignsArray = Record<
  number,
  {
    name: string;
    cod: string;
    data: string;
    medicated: string;
    userRespon: {};
  }
>;
type MedicineReportDay = Record<
  number,
  {
    idResident: string;
    description: string;
    data: string;
    userRespon: {};
  }
>;

export function InforResident() {
  const history = useHistory();
  const { user } = useAuth();

  const params = useParams<RoomParams>();
  const residentId = params.id;
  const [resident, setResident] = useState<ResidentArray>();
  const [listMedicine, setListMedicine] = useState<MedicineArray[]>();
  const [listVitalSigns, setListVitalSigns] = useState<VitalSigntsArray[]>();
  const [listReportDay, setReportDay] = useState<ReportDayArray[]>();
  const [modalAddVS, setModalAddVS] = useState(false);
  const [modalAddMd, setModalAddMd] = useState(false);
  const [modalAddRD, setModalAddRD] = useState(false);

  const [datelistVS, setdatelistVS] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [datelistMd, setdatelistMd] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [datelistRD, setdatelistRD] = useState<string>(
    moment().format("YYYY-MM-DD")
  );

  useEffect(() => {
    handleSetResidents();
    handleSetReportDay();
    handleSetMedicineUser();
    handleSetListVitalSigns();
  }, []);

  //play when "datelistVS" is modified
  useEffect(() => {
    handleSetListVitalSigns();
  }, [datelistVS]);

  //play when "datelistMd" is modified
  useEffect(() => {
    handleSetMedicineUser();
  }, [datelistMd]);

  //play when "datelistRD" is modified
  useEffect(() => {
    handleSetReportDay();
  }, [datelistRD]);

  async function handleSetMedicineUser() {
    const ref = await database
      .ref("medicine-residents")
      .orderByChild("idResident")
      .equalTo(residentId);

    ref.once("value", (room) => {
      const databaseMedicine = room.val();

      const firebaseMedicine: MedicineSignsArray = databaseMedicine ?? {};

      const arrayMedicineDay = Object.entries(firebaseMedicine).map(
        ([key, value]) => {
          return {
            id: key,
            name: value.name,
            cod: value.cod,
            data: value.data,
            medicated: value.medicated,
            userRespon: value.userRespon,
          };
        }
      );

      setListMedicine(
        arrayMedicineDay.filter(
          (row) => moment(row.data).format("YYYY-MM-DD") === datelistMd
        )
      );
    });
  }

  async function handleSetResidents() {
    const ref = await database.ref("residents").child(residentId);

    ref.once("value", (room) => {
      if (room.exists()) {
        const infor = room.val();

        setResident({
          id: residentId,
          name: infor.name,
          birthDate: infor.birthDate,
          bloodType: infor.bloodType,
          height: infor.height,
          sexo: infor.sexo,
          weight: infor.weight,
          medicalPicture: infor.medicalPicture,
        });
      }
    });
  }

  async function handleSetListVitalSigns() {
    const ref = await database
      .ref("vital-signs-resident")
      .orderByChild("idResident")
      .equalTo(residentId);

    ref.once("value", (room) => {
      if (room.exists()) {
        const databaseVitalSigns = room.val();

        const firebaseVitalSigns: FirebaseVitalSignsArray =
          databaseVitalSigns ?? {};

        const arrayVitalSigns = Object.entries(firebaseVitalSigns).map(
          ([key, value]) => {
            return {
              id: key,
              FC: value.FC,
              FR: value.FR,
              PA: value.PA,
              TC: value.TC,
              date: value.date,
              idResident: value.idResident,
              pain: value.pain,
              time: value.time,
              type: value.type,
              userRespon: value.userRespon,
            };
          }
        );

        setListVitalSigns(
          arrayVitalSigns.filter((row) => row.date === datelistVS)
        );
      }
    });
  }

  async function handleSetReportDay() {
    const ref = await database
      .ref("report-day-resident")
      .orderByChild("idResident")
      .equalTo(residentId);

    ref.once("value", (room) => {
      const databaseReportDay = room.val();

      const firebaseReportDay: MedicineReportDay = databaseReportDay ?? {};

      const arrayRD = Object.entries(firebaseReportDay).map(([key, value]) => {
        return {
          id: key,
          idResident: value.idResident,
          description: value.description,
          data: value.data,
          userRespon: value.userRespon,
        };
      });

      setReportDay(
        arrayRD.filter(
          (row) => moment(row.data).format("YYYY-MM-DD") === datelistRD
        )
      );
    });
  }

  // -Mz_yK3aR56LT-sPoxG_
  // -MzqqFaHZI-jXplhAyRG

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" className="" />
          <div>{/* <RoomCode code={residentId} /> */}</div>
        </div>
      </header>

      <main>
        <div>
          <h1>Informações Sobre Residente </h1>
        </div>
        <div>
          <div className="content-user">
            {resident && (
              <UserResidentInfor
                id={residentId}
                name={resident.name}
                birthDate={resident.birthDate}
                bloodType={resident.bloodType}
                height={resident.height}
                sexo={resident.sexo}
                weight={resident.weight}
              />
            )}
          </div>

          {/* Quadro Medico */}
          <div className="content">
            <Title text="Quadro Medico" icon={faNotesMedical} />
            <p className="">
              {resident && resident.medicalPicture
                ? resident.medicalPicture
                : "Não existe Informação sobre Quadro medico"}
            </p>
          </div>

          <div className="content">
            <Title text="Sinais Vitais" icon={faHeartPulse} />
            <div className="content-date-new-vs">
              <div className="input-date">
                <span>Dia</span>
                <input
                  type="date"
                  name="Dia"
                  value={datelistVS}
                  onChange={(event) =>
                    setdatelistVS(
                      moment(event.target.value).format("YYYY-MM-DD")
                    )
                  }
                />
              </div>
              {user && (
                <Button
                  type="submit"
                  isOutLined
                  onClick={() => setModalAddVS(!modalAddVS)}
                >
                  Adicionar Sinais Vitais
                </Button>
              )}
            </div>
            <Table list={listVitalSigns} />
          </div>

          {/* Relatorio Diario */}
          <div className="content">
            <Title text="Relatorio Diario" icon={faReceipt} />

            <div className="content-date-new-vs">
              <div className="input-date">
                <span>Dia</span>
                <input
                  type="date"
                  name="Dia"
                  value={datelistRD}
                  onChange={(event) =>
                    setdatelistRD(
                      moment(event.target.value).format("YYYY-MM-DD")
                    )
                  }
                />
              </div>
              {user && (
                <Button
                  type="submit"
                  isOutLined
                  onClick={() => setModalAddRD(!modalAddRD)}
                >
                  Adicionar Relatorio Diario
                </Button>
              )}
            </div>
            <ReportDay list={listReportDay} />
          </div>

          {/* Medicamentos */}
          <div className="content">
            <Title text="Medicamentos" icon={faPills} />
            <div className="content-date-new-vs">
              <div className="input-date">
                <span>Dia</span>
                <input
                  type="date"
                  name="Dia"
                  value={datelistMd}
                  onChange={(event) =>
                    setdatelistMd(
                      moment(event.target.value).format("YYYY-MM-DD")
                    )
                  }
                />
              </div>
              {user && (
                <Button
                  type="submit"
                  isOutLined
                  onClick={() => setModalAddMd(!modalAddVS)}
                >
                  Adicionar Medicamento
                </Button>
              )}
            </div>
            <TableMedicine
              list={listMedicine}
              onGetList={handleSetMedicineUser}
            />
          </div>
          {/* <div className="">
            <h3> Calendario</h3>
          </div> */}
        </div>

        <div className="button-bk">
          {user && (
            <Button
              type="submit"
              isOutLined
              onClick={() =>
                history.push(`../${localStorage.getItem("local")}`)
              }
            >
              Voltar{" "}
            </Button>
          )}
        </div>
      </main>

      {/* Modal Create new Vital Signs */}
      <ModalAddVitalSigns
        open={modalAddVS}
        resident={residentId}
        title={"Adicionar Sinais Vitais"}
        onClose={() => setModalAddVS(false)}
        onVitalSigns={() => handleSetListVitalSigns()}
      />

      {/* Modal Create new Medicine */}
      <ModalAddMedicine
        open={modalAddMd}
        resident={residentId}
        title={"Adicionar Medicamento"}
        onClose={() => setModalAddMd(false)}
        onMedicine={() => handleSetMedicineUser()}
      />

      {/* Modal Create new Report Day */}
      <ModalAddReportDay
        open={modalAddRD}
        resident={residentId}
        title={"Adicionar Relatorio Diario"}
        onClose={() => setModalAddRD(false)}
        onMedicine={() => handleSetMedicineUser()}
      />
    </div>
  );
}
