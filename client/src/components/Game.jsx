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

const initFormVals = {
  direction: "md",
};

const Game = () => {
  const [info, setInfo] = React.useState(initInfo);
  const [formVals, setFormVals] = React.useState(initFormVals);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    gameOps
      .move(formVals)
      .then((res) => {
        setInfo({
          ...info,
          description: res.data.description,
          title: res.data.title,
          players: res.data.players,
        });
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });

    setFormVals(initFormVals);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormVals({
      ...formVals,
      [name]: value,
    });
  };

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
      <form className="movement-form" onSubmit={handleSubmit}>
        <label className="label move-select-label">
          Move
          <select
            className="select move-select"
            name="direction"
            value={formVals.direction}
            onChange={handleChange}
          >
            <option value="">Move Direction</option>
            <option value="n">North</option>
            <option value="s">South</option>
            <option value="e">East</option>
            <option value="w">West</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
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
