import "../styles/patients.scss";
import { useHistory } from "react-router-dom";
import { FormEvent } from "react";
import { UserResidentInfor } from "./UserResidentInfor";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PatientArray = {
  id: string;
  name: string;
  birthDate: string;
  bloodType: string;
  height: string;
  sexo: string;
  weight: string;
};

export function Residents(props: PatientArray) {
  const history = useHistory();

  function handleSetResidentInfor(event: FormEvent) {
    event.preventDefault();
    history.push(`resident-infor/${props.id}`);
  }

  return (
    <div className="patient-infor">
      <UserResidentInfor {...props} />

      <form onSubmit={handleSetResidentInfor}>
        <button className="content-icon">
          <i>
            <FontAwesomeIcon icon={faPlay} />
          </i>
        </button>
      </form>
    </div>
  );
}
