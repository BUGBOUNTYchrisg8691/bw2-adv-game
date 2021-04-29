import React from "react";

import { axiosAuth } from "../utils";
import { gameOps } from "../utils/game";

const initInfo = {
  uuid: "",
  name: "",
  title: "",
  description: "",
  players: [],
};

const Game = () => {
  const [info, setInfo] = React.useState(initInfo);

  let pusher = new Pusher(process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
  });

  let channel = pusher.subscribe(`p-channel-${info.uuid}`);
  channel.bind("broadcast", (mes) => console.log(mes));

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
      <button
        className="button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          gameOps
            .say({ message: "test" })
            .then((res) => {
              console.log({ res });
            })
            .catch((err) => {
              console.log({ err });
            });
        }}
      >
        Test Say
      </button>
    </div>
  );
};

export default Game;
