import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rules from "../components/Rules";
import Settings from "../components/Settings";
import Title from "../components/Title";
import AllPlayers from "../components/AllPlayers";
import { changeGameState, setTime } from "../store/RoomStore";

export default function Lobby() {
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.PlayerStore);
  const { rounds, time } = useSelector((state) => state.RoomStore);

  const setGameState = () => {
    socket.emit("session/start", rounds, time);
  };

  useEffect(() => {
    const startGame = (timer) => {
      dispatch(setTime(timer));
      dispatch(changeGameState("start"));
    };

    socket.on("game/start", startGame);
  }, [dispatch, socket]);

  return (
    <div className="lobby">
      <Title />
      <div className="lobby__info">
        <Settings />
        <button className="start" onClick={setGameState}>
          Start
        </button>
        <Rules />
      </div>
      <AllPlayers />
    </div>
  );
}
