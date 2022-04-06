import React, { useState, FormEvent, ComponentType } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

import { Input } from "./InputLabel";
import { Button } from "./Button";

import { database } from "../services/firebase";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";

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

export const ModalAddReportDay: React.FC<ModalProps> = ({
  open,
  title,
  onClose,
  resident,
  onMedicine,
}) => {
  const classes = useStyles();
  const { user } = useAuth();
  const [modalStyle] = useState(getModalStyle);
  const [text, setText] = useState<string>("");

  async function handleSaveReportDay(event: FormEvent) {
    event.preventDefault();

    const reportDayRef = database.ref("report-day-resident");

    const firebase = await reportDayRef.push({
      idResident: resident,
      data: moment().format("YYYY-MM-DD H:mm"),
      description: text,
      userRespon: user,
    });

    firebase && onClose();
    firebase && onMedicine();
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
                <textarea name="" onChange={(e) => setText(e.target.value)} />
              </form>

              <div className="content-button">
                <Button type="submit" onClick={onClose} isOutLined>
                  Fechar{" "}
                </Button>
                <Button type="submit" onClick={handleSaveReportDay}>
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
