import axios from "axios";

export const getList = () => {
  const proxyurl = "";
  const apiBaseUrl = "http://127.0.0.1:5000";
  return axios
    .get(proxyurl + apiBaseUrl + "/api/tasks", {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => {
      var data = [];
      Object.keys(res.data).forEach(function (key) {
        var val = res.data[key];
        data.push([val.title, val._id]);
      });

      return data;
    });
};

export const addToList = (term) => {
  const proxyurl = "";
  const apiBaseUrl = "http://127.0.0.1:5000";
  const requestOptionsValue = {
    title: term,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(proxyurl + apiBaseUrl + "/api/tasks", requestOptionsValue)
    .then((response) => {});
};

export const deleteItem = (term) => {
  const apiBaseUrl = "http://127.0.0.1:5000";
  return axios
    .delete(apiBaseUrl + `/api/tasks/${term}`, {
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => response)
    .catch((err) => err);
};

export const updateItem = (term, id) => {
  const proxyurl = "";
  const apiBaseUrl = "http://127.0.0.1:5000";
  const requestOptionsValue = {
    title: term,
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .put(proxyurl + apiBaseUrl + `/api/tasks/${id}`, requestOptionsValue)
    .then((response) => response);
};
