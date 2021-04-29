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

export const axiosCall = (user) => {
  return baseAxios
    .post(user)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};
