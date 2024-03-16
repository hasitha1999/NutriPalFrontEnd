import server from "../config/server";

export const getRefUser = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/users/getreflink");
