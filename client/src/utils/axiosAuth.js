import axios from "axios";

import { BE_BASEURL } from "../constants";

const axiosAuth = () => {
  const token_val = window.localStorage.getItem("token");

  return axios.create({
    baseURL: BE_BASEURL,
    headers: {
      Authorization: `Token ${token_val}`,
    },
  });
};

export default axiosAuth;
