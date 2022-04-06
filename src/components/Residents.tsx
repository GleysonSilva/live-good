import "../styles/patients.scss";
import { useHistory } from "react-router-dom";
import { FormEvent } from "react";
import { UserResidentInfor } from "./UserResidentInfor";

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
          <i className="fas fa-arrow-right"></i>
        </button>
      </form>
    </div>
  );
}
