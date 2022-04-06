import React, { useState, FormEvent, ComponentType } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import { Input } from "./InputLabel";
import { Button } from "./Button";

import "../styles/modal.scss";
import { database } from "../services/firebase";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50em",
    borderRadius: "9px",
    backgroundColor: theme.palette.background.paper,
    border: "0px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

type ModalProps = {
  open: boolean;
  title: String;
  resident: String;
  onClose: () => void;
  onVitalSigns: () => void;
};

export const ModalAddVitalSigns: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  resident,
  onVitalSigns,
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [modalStyle] = React.useState(getModalStyle);
  const [vitalSigns, setVitalSigns] = useState({
    FR: "",
    FC: "",
    PA: "",
    TC: "",
    pain: "",
    type: "0",
  });

  const handleChangeVitalSigns = (title: string, value: {}) => {
    setVitalSigns({ ...vitalSigns, [title]: value });
  };

  async function handleSaveVitalSigns(event: FormEvent) {
    event.preventDefault();

    const ResidentRef = database.ref("vital-signs-resident");

    const firebase = await ResidentRef.push({
      idResident: resident,
      FR: vitalSigns.FR,
      FC: vitalSigns.FC,
      PA: vitalSigns.PA,
      TC: vitalSigns.TC,
      pain: vitalSigns.pain,
      type: vitalSigns.type,
      date: moment().format("YYYY-MM-DD"),
      time: moment().format("H:mm"),
      userRespon: user,
    });

    firebase && onClose();
    firebase && onVitalSigns();
  }
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <>
          <div style={modalStyle} className={classes.paper}>
            <h3>{title}</h3>
            <div>
              <form action="">
                <Input
                  type="text"
                  label="Temperatura Corporal"
                  value={vitalSigns.TC}
                  onChange={(event) =>
                    handleChangeVitalSigns("TC", event.target.value)
                  }
                />
                <Input
                  type="text"
                  label="Pulso (ou frequência cardíaca - FC)"
                  value={vitalSigns.FC}
                  onChange={(event) =>
                    handleChangeVitalSigns("FC", event.target.value)
                  }
                />
                <Input
                  type="text"
                  label="Pressão Arterial (PA)"
                  value={vitalSigns.PA}
                  onChange={(event) =>
                    handleChangeVitalSigns("PA", event.target.value)
                  }
                />
                <Input
                  type="text"
                  label="Frequência Respiratória (FR)"
                  value={vitalSigns.FR}
                  onChange={(event) =>
                    handleChangeVitalSigns("FR", event.target.value)
                  }
                />
                <Input
                  type="text"
                  label="Dor"
                  value={vitalSigns.pain}
                  onChange={(event) =>
                    handleChangeVitalSigns("pain", event.target.value)
                  }
                />
                <select
                  name="select"
                  value={vitalSigns.type}
                  onChange={(event) =>
                    handleChangeVitalSigns("type", event.target.value)
                  }
                >
                  <option value={"0"}>Manhã</option>
                  <option value={"1"}>Tarde</option>
                  <option value={"2"}>Noite</option>
                </select>
              </form>
              <div className="content-button">
                <Button type="submit" onClick={onClose} isOutLined>
                  Fechar{" "}
                </Button>

                <Button type="submit" onClick={handleSaveVitalSigns}>
                  Salvar Sinais Vitais{" "}
                </Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};
