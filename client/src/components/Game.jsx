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

const initSayVal = {
  say: "",
};

const Game = () => {
  const [info, setInfo] = React.useState(initInfo);
  const [formVals, setFormVals] = React.useState(initFormVals);
  const [sayVal, setSayVal] = React.useState(initSayVal);

  const pusher = new Pusher(process.env.PUSHER_KEY, {
    cluster: process.env.PUSHER_CLUSTER,
  });

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

    if (info) {
      const channel = pusher.subscribe(`p-channel-${info.uuid}`);
      channel.bind("broadcast", (data) => console.log(data));
    }
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

  const handleChangeSay = (e) => {
    const { name, value } = e.target;
    setSayVal({
      ...sayVal,
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
      <label className="label say-label">
        Say something to room:
        <input
          type="text"
          value={sayVal.say}
          onChange={handleChangeSay}
          name="say"
        />
      </label>
      <button
        className="button"
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          gameOps
            .say({ message: sayVal.say })
            .then((res) => {
              console.log({ res });
            })
            .catch((err) => {
              console.log({ err });
            });
          setSayVal(initSayVal);
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;
