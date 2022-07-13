import axios from "axios";

export const register = (newUser) => {
  const apiBaseUrl = "http://127.0.0.1:5000";
  const requestOptionsValue = {
    headers: { "Access-Control-Allow-Origin": "*" },
    mode: "cors",
    first_name: newUser.first_name,
    last_name: newUser.last_name,
    username: newUser.username,
    password: newUser.password,
  };
  return axios
    .post(apiBaseUrl + "/register", requestOptionsValue)
    .then((response) => response);
};

export const login = (user) => {
  const apiBaseUrl = "http://127.0.0.1:5000";
  const requestOptionsValue = {
    headers: { "Access-Control-Allow-Origin": "*" },
    username: user.username,
    password: user.password,
  };
  return axios
    .post(apiBaseUrl + "/login", requestOptionsValue)
    .then((response) => {
      localStorage.setItem("usertoken", response.data.token);

      return response.data.token;
    })
    .catch((err) => err);
};
