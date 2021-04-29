import axios from "axios";

import { BE_BASEURL } from "../constants";

export const baseAxios = () => {
  return axios.create({
    baseURL: BE_BASEURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const preAuthAxiosCall = (creds) => {
  if (creds["password2"]) {
    return baseAxios()
      .post("/api/registration/", creds)
      .then((res) => {
        window.localStorage.setItem("token", res.data.key);
        return res;
      })
      .catch((err) => {
        return err;
      });
  } else {
    const user = { username: creds["username"], password: creds["password1"] };
    return baseAxios()
      .post("/api/login/", user)
      .then((res) => {
        window.localStorage.setItem("token", res.data.key);
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
};

export default preAuthAxiosCall;
