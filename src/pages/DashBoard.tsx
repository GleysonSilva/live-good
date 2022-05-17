import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo1.png";
import { Button } from "../components/Button";
// import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { Residents } from "../components/Residents";
import { Calendar } from "../components/Calendar";
import { Link } from "react-router-dom";
import { Title } from "../components/Title";
import { database } from "../services/firebase";

// icon
import { faCalendarDay, faUserGroup, faQrcode } from "@fortawesome/free-solid-svg-icons";

import "../styles/room.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
};

type FirebaseResidentArray = Record<
  number,
  {
    id: string;
    name: string;
    birthDate: string;
    bloodType: string;
    height: string;
    sexo: string;
    weight: string;
  }
>;
type FirebaseCalendarArray = Record<
  number,
  {
    idResident: string;
    data: string;
    name: string;
    timeMed: string;
  }
>;

type CalendarArray = {
  data: string;
  idResident: string;
  name: string;
  timeMed: string;
  patinet: {
    birthDate: string;
    bloodType: string;
    height: string;
    local: string;
    name: string;
    responsible: { name: string };
    sexo: string;
    weight: string;
  };
};

export function DashBoard() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [listResidents, setListResidents] = useState<ResidentArray[]>();
  const [listCalendar, setListCalendar] = useState<CalendarArray[]>();

  useEffect(() => {
    handleSeachListResident();
    handleGetCalendar();
  }, []);

  async function handleSeachListResident() {
    const ref = database.ref("residents").orderByChild("local").equalTo(roomId);
    // /local/-MyyC2818ALHfrKIJvjt

    ref.on("value", (room) => {
      const databaseResident = room.val();

      const firebaseResident: FirebaseResidentArray = databaseResident ?? {};

      const arrayResident = Object.entries(firebaseResident).map(
        ([key, value]) => {
          return {
            id: key,
            name: value.name,
            birthDate: value.birthDate,
            bloodType: value.bloodType,
            height: value.height,
            sexo: value.sexo,
            weight: value.weight,
          };
        }
      );
      setListResidents(arrayResident);
    });
  }

  async function handleGetCalendar() {
    const newListCalendar: any[] = [];

    const ref = database.ref("medicine-residents").orderByChild("data");
    // .equalTo(moment().format("YYYY-MM-DD"));

    ref.on("value", (room) => {
      const calendar = room.val();

      const firebaseCalendar: FirebaseCalendarArray = calendar ?? {};

      const arrayResident = Object.entries(firebaseCalendar).map(
        ([key, value]) => {
          return {
            id: key,
            idResident: value.idResident,
            data: value.data,
            name: value.name,
            timeMed: value.timeMed,
          };
        }
      );

      arrayResident.forEach((element) => {
        database
          .ref("residents")
          .child(element.idResident)
          .once("value", (row) => {
            const patinetId = row.val();

            newListCalendar.push({
              ...element,
              patinet: { ...patinetId },
            });
          });
      });
      setListCalendar(newListCalendar);
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" className="" />
          <div>
            <Link to="/reader-qrc">

              <Button>
                <FontAwesomeIcon icon={faQrcode} /> {'  '}Qrcode
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <div>
            <h1>Dashboard </h1>
          </div>
          <div>
            <Link to="/local/register-resident">
              <Button type="submit">Adicionar Residente </Button>
            </Link>
          </div>
        </div>

        <div className="content">
          <Title text="Lista Residente" icon={faUserGroup} />

          {listResidents?.map((row) => {
            return (
              <Residents
                key={row.id}
                id={row.id}
                name={row.name}
                birthDate={row.birthDate}
                bloodType={row.bloodType}
                height={row.height}
                sexo={row.sexo}
                weight={row.weight}
              />
            );
          })}
        </div>
        <div className="content">
          <Title text="Companhamento" icon={faCalendarDay} />
          <Calendar listCalendar={listCalendar} />
        </div>
      </main>
    </div>
  );
}
