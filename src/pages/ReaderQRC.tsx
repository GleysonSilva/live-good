import { useState, FormEvent, useEffect } from "react";
import logoImg from "../assets/images/logo1.png";
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router-dom";

import { QrReader, QrReaderProps } from "react-qr-reader";
import { database } from "../services/firebase";

export const ReaderQRC: React.FC<QrReaderProps> = () => {
  const history = useHistory();

  const { user } = useAuth();
  const [data, setData] = useState<any>("No result");

  async function handleSetResidentInfor(iDResi: any) {
    if (iDResi.trim() === "") {
      return;
    }
    const idResiRef = await database.ref(`residents/${iDResi}`).get();
    if (!idResiRef.exists()) {
      alert("Não Existe Residente com Este ID Cadastrado");
      return;
    }
    history.push(`local/resident-infor/${iDResi}`);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" className="" />
          <div>
            {/* <RoomCode code={roomId} /> */}
            {/* <Button isOutLined>Go out</Button> */}
          </div>
        </div>
      </header>

      <main>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleSetResidentInfor(result.getText());
            }

            // if (!!error) {
            // }
          }}
        />

        <p>{data === "No result" && "Não encontrado..."}</p>
      </main>
    </div>
  );
};
