import { FormEvent, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo1.png";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss";
import { database } from "../services/firebase";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [view, setView] = useState<boolean>(false);
  const [iDResi, setIDResi] = useState<string>("");

  const [roomCode, setroomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/local/new");
  }

  async function handleGetResident(event: FormEvent) {
    event.preventDefault();

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
    <div id="page-auth">
      <aside>
        {/* <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>  */}
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          {!view ? (
            <>
              <div className="separator">Login Sistema</div>

              <button onClick={handleCreateRoom} className="create-room">
                <img src={googleIconImg} alt="Logo do Google" />
                Entrar com o Google
              </button>

              <p>
                Ir Para Companhamento de Residente{" "}
                <a onClick={() => setView(!view)}>Click Aqui</a>
              </p>
            </>
          ) : (
            <>
              <div className="separator">Companhar Residente</div>

              <form onSubmit={handleGetResident}>
                <input
                  type="text"
                  placeholder="Digite o código do Residente"
                  onChange={(event) => setIDResi(event.target.value)}
                  value={iDResi}
                />
                <Button type="submit">Entrar</Button>
              </form>
              <p>
                Ir Para Login <a onClick={() => setView(!view)}>Click Aqui</a>{" "}
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
