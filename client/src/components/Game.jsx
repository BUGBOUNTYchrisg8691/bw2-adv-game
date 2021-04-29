import React from "react";

import { axiosAuth } from "../utils";

const initInfo = {
  uuid: "",
  name: "",
  title: "",
  description: "",
  players: [],
};

const Game = () => {
  const [info, setInfo] = React.useState(initInfo);

  React.useEffect(() => {
    axiosAuth()
      .get("/api/adv/init/")
      .then((res) => {
        setInfo(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="game-container">
      <h3>Game</h3>
      <div className="info-container">
        <ul>
          <li>Name: {info.name}</li>
          <li>Room: {info.title}</li>
          <li>Description: {info.description}</li>
          <li>Players: {JSON.stringify(info.players)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Game;
