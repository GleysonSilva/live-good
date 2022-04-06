import { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo1.png";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import { Question } from "../components/Question";

import { useRoom } from "../hooks/useRoom";

import "../styles/room.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestion, setNewQuestion] = useState("");

  //creato Hooks
  const { title, questions } = useRoom(roomId);

  //entries [['name', 'idade']]

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") return;

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },

      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="" className="" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutLined>Go out</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Room {title} </h1>
          {questions && questions.length > 0 && (
            <span className=""> {questions.length} questions</span>
          )}
        </div>

        <div className="quetion-list">
          {questions?.map((row) => {
            return (
              <Question
                key={row.id}
                content={row.content}
                author={row.author}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
