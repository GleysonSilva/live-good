import React, { useState, FormEvent, ComponentType } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import { Input } from "./InputLabel";
import { Button } from "./Button";

import { database } from "../services/firebase";
import moment from "moment";

import "../styles/modal.scss";

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
  onMedicine: () => void;
};

export const ModalAddMedicine: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  resident,
  onMedicine,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [medicine, setMedicine] = useState({
    name: "",
    cod: "",
    dateInt: "",
    dateEnd: "",
    timeMed: "",
    hrsMed: "",
  });

  async function handleSaveMedicine(event: FormEvent) {
    event.preventDefault();

    let diff = Math.floor(
      moment(new Date(medicine.dateEnd)).diff(
        moment(medicine.dateInt),
        "days",
        true
      )
    );

    const ResidentRef = database.ref("medicine-residents");

    const listDataHrs: any = [];

    for (let index = 0; index < diff; index++) {
      await listDataHrs.push({
        idResident: resident,
        name: medicine.name,
        cod: medicine.cod,
        data:
          index === 0
            ? moment(`${medicine.dateInt} ${medicine.timeMed}`).format(
                "YYYY-MM-DD H:mm"
              )
            : moment(listDataHrs[index - 1].data)
                .add(medicine.hrsMed, "hours")
                .format("YYYY-MM-DD H:mm"),
      });
    }

    listDataHrs.map((row: any) => {
      ResidentRef.push({
        idResident: row.idResident,
        name: row.name,
        cod: row.cod,
        data: row.data,
        medicated: false,
        userRespon: false,
      });
    });

    onClose();
    onMedicine();
  }

  const handleChange = (title: string, value: {}) => {
    setMedicine({ ...medicine, [title]: value });
  };

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
                  label="Nome Medicamento"
                  value={medicine.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                />
                <Input
                  type="text"
                  label="Cod"
                  value={medicine.cod}
                  onChange={(event) => handleChange("cod", event.target.value)}
                />
                <Input
                  type="time"
                  label="Inicio da Medicação"
                  value={medicine.timeMed}
                  onChange={(event) =>
                    handleChange("timeMed", event.target.value)
                  }
                />

                <select
                  name="select"
                  value={medicine.hrsMed}
                  onChange={(event) =>
                    handleChange("hrsMed", event.target.value)
                  }
                >
                  <option value={"6"}>6 em 6 Horas</option>
                  <option value={"8"}>8 em 8 Horas</option>
                  <option value={"12"}>12 em 12 Horas</option>
                  <option value={"24"}>24 em 24 Horas</option>
                </select>

                <Input
                  type="date"
                  label="Data Inicio"
                  value={medicine.dateInt}
                  onChange={(event) =>
                    handleChange("dateInt", event.target.value)
                  }
                />
                <Input
                  type="date"
                  label="Data Final"
                  value={medicine.dateEnd}
                  onChange={(event) =>
                    handleChange("dateEnd", event.target.value)
                  }
                />
              </form>
              <div className="content-button">
                <Button type="submit" onClick={onClose} isOutLined>
                  Fechar{" "}
                </Button>
                <Button type="submit" onClick={handleSaveMedicine}>
                  Salvar Medicamento{" "}
                </Button>
              </div>
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};
