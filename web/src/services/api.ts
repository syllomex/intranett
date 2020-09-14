import Axios from "axios";

const url_api = "http://localhost:8080";

const api = Axios.create({
  baseURL: url_api,
  headers: {
    "Content-Type": "application/json",
  },
});

export { url_api, api };
