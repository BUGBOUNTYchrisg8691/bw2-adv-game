import { axiosAuth } from "../";

const init = () => {
  return axiosAuth()
    .get("/api/adv/init/")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const move = (dir) => {
  return axiosAuth()
    .post("/api/adv/move/", dir)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

const say = (mes) => {
  return axiosAuth()
    .post("/api/adv/say/", mes)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default { init, move, say };
