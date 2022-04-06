import { useState, FormEvent } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo1.png";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Input } from "../components/InputLabel";
import { useHistory } from "react-router-dom";
import { Title } from "../components/Title";

import "../styles/patient.scss";
import { database } from "../services/firebase";

type RoomParams = {
  id: string;
};

// type NewPatientParams = {
//   name: string;
//   date: string;
//   phone: number;
// };
// //  const hadle = (name: string) => {
// //     setNewResident({ ...newResident, name: name, phone: 32432, date: "dsa" });
// //   };

export function RegisterResident() {
  const history = useHistory();

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newResident, setNewResident] = useState({
    name: "",
    sexo: "M",
    birthDate: "",
    bloodType: "",
    weight: "",
    height: "",
    medicalPicture: "",
    responsible: {
      name: "",
      phone: "",
      kinship: "",
      address: "",
    },
  });

  const handleChange = (title: string, value: {}) => {
    setNewResident({ ...newResident, [title]: value });
  };

  const handleChangeResposible = (title: string, name: string, value: {}) => {
    setNewResident({
      ...newResident,
      [name]: { ...newResident.responsible, [title]: value },
    });
  };

  async function saveNewResident(event: FormEvent) {
    event.preventDefault();

    const residentRef = database.ref("residents");

    const firebase = await residentRef.push({
      name: newResident.name,
      sexo: newResident.sexo,
      birthDate: newResident.birthDate,
      bloodType: newResident.bloodType,
      weight: newResident.weight,
      height: newResident.height,
      local: localStorage.getItem("local"),
      medicalPicture: newResident.medicalPicture,
      responsible: {
        name: newResident.responsible.name,
        phone: newResident.responsible.phone,
        kinship: newResident.responsible.kinship,
        address: newResident.responsible.address,
      },
    });

    firebase && history.push(`./${localStorage.getItem("local")}`);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" className="" />
          <div>
            <RoomCode code={roomId} />
          </div>
        </div>
      </header>

      <main>
        <h1>Cadastrar Novo Residente </h1>
        <div>
          <Title text="Informação sobre Residente" icon={false} />
          <form onSubmit={saveNewResident}>
            <Input
              type="text"
              label="Nome do Residente"
              value={newResident.name}
              onChange={(event) => handleChange("name", event.target.value)}
            />

            <select
              name="select"
              value={newResident.sexo}
              onChange={(event) => handleChange("sexo", event.target.value)}
            >
              <option value={"M"}>Masculino</option>
              <option value={"F"}>Feminino</option>
            </select>

            <Input
              type="date"
              label="Data Nascimento"
              value={newResident.birthDate}
              onChange={(event) =>
                handleChange("birthDate", event.target.value)
              }
            />

            <Input
              type="text"
              label="Peso"
              value={newResident.weight}
              onChange={(event) => handleChange("weight", event.target.value)}
            />
            <Input
              type="text"
              label="Altura"
              value={newResident.height}
              onChange={(event) => handleChange("height", event.target.value)}
            />
            <Input
              type="text"
              label="Tipo sanguíneo"
              value={newResident.bloodType}
              onChange={(event) =>
                handleChange("bloodType", event.target.value)
              }
            />

            <textarea
              placeholder="Quadro Médico"
              value={newResident.medicalPicture}
              onChange={(event) =>
                handleChange("medicalPicture", event.target.value)
              }
            />
          </form>

          <Title text="Informação Responsavel" icon={false} />
          <form action="">
            <Input
              type="text"
              label="Nome Responsavel"
              value={newResident.responsible.name}
              onChange={(event) =>
                handleChangeResposible(
                  "name",
                  "responsible",
                  event.target.value
                )
              }
            />
            <Input
              type="text"
              label="Parentesco"
              value={newResident.responsible.kinship}
              onChange={(event) =>
                handleChangeResposible(
                  "kinship",
                  "responsible",
                  event.target.value
                )
              }
            />
            <Input
              type="phone"
              label="Telefone"
              value={newResident.responsible.phone}
              onChange={(event) =>
                handleChangeResposible(
                  "phone",
                  "responsible",
                  event.target.value
                )
              }
            />
            <Input
              type="text"
              label="Endereço Responsavel"
              value={newResident.responsible.address}
              onChange={(event) =>
                handleChangeResposible(
                  "address",
                  "responsible",
                  event.target.value
                )
              }
            />
          </form>

          <div className="content-button">
            <Button type="submit" onClick={saveNewResident}>
              Salvar{" "}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
