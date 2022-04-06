import iconGirl from "../assets/images/girl.png";
import iconMan from "../assets/images/man.png";
import moment from "moment";

import "../styles/userPatientInfor.scss";

type PatientArray = {
  id: string;
  name: string;
  birthDate: string;
  bloodType: string;
  height: string;
  sexo: string;
  weight: string;
};

export function UserResidentInfor(props: PatientArray) {
  const age = (age: string) => {
    return `Idade ${Math.floor(
      moment(new Date()).diff(moment(age), "years", true)
    )}`;
  };

  return (
    <div className="content-infor">
      <div className="img-patient">
        <img src={props.sexo === "M" ? iconMan : iconGirl} alt="" />
      </div>
      <div className="group-patient-infor">
        <div className="infor-1">
          <span>{props.name}</span> - <span>{age(props.birthDate)}</span>
        </div>
        <div className="infor-2">
          <span>( Sangue {props.bloodType})</span>
          <span>( Altura {props.height} )</span>
          <span>( Peso {props.weight} kg)</span>
        </div>
      </div>
    </div>
  );
}
