import "../styles/patient.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TitleParams = {
  text: string;
  icon?: any;
};

export function Title({ icon = false, ...props }: TitleParams) {
  return (
    <div className="title-icon">
      {icon && <FontAwesomeIcon icon={icon} fontSize="30" />}
      <h4>{props.text}</h4>
    </div>
  );
}
