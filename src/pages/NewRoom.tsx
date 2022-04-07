import { FormEvent, useState, useEffect, createContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { isContext } from "vm";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo1.png";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/auth.scss";

type FirebaseLocations = Record<
  string,
  {
    id: string;
    title: string;
  }
>;

type LocationArray = {
  id: string;
  title: string;
};

type localContextType = {
  id: string;
  title: string;
};

export const LocalContext = createContext({} as localContextType);

export function NewRoom() {
  const history = useHistory();
  const [local, setLocal] = useState("");
  const [listLocations, setListLocations] = useState<LocationArray[]>();

  useEffect(() => {
    const ref = database.ref(`locations`);

    ref.on("value", (room) => {
      const databaseLocation = room.val();

      const firebaseLocations: FirebaseLocations = databaseLocation ?? {};

      const arrayLocations = Object.entries(firebaseLocations).map(
        ([key, value]) => {
          return {
            id: key,
            title: value.title,
          };
        }
      );
      setListLocations(arrayLocations);
    });
  }, []);

  // async function handleCreateLocal(event: FormEvent) {
  //   event.preventDefault();

  //   if (newRoom.trim() === "") {
  //     return;
  //   }

  //   const roomRef = database.ref("locations");

  //   const firebaseLocations = await roomRef.push({
  //     title: newRoom,
  //     address: "",
  //   });

  //   // history.push(`/rooms/${firebaseLocations.key}`);
  // }

  async function handleSetLocal(event: FormEvent) {
    event.preventDefault();

    if (local.trim() === "") {
      return;
    }

    localStorage.setItem("local", local);
    history.push(`/local/${local}`);

    // const roomRef = database.ref("locations");

    // const firebaseRoom = await roomRef.push({
    //   title: local,
    // });
  }

  return (
    <div id="page-auth">
      <aside></aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Selecionar Local</h2>
          {/* <form onSubmit={handleCreateLocal}>
            <input
              type="text"
              value={newRoom}
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />

            <Button type="submit">Create local </Button>
          </form> */}

          <form onSubmit={handleSetLocal}>
            <select
              name="select"
              onChange={(event) => setLocal(event.target.value)}
            >
              {listLocations &&
                listLocations.map((row) => (
                  <option value={row.id}>{row.title}</option>
                ))}
            </select>
            <Button type="submit">Entrar </Button>
          </form>
          <p>
            voltar <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
