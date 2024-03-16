import server from "../config/server";

export const getAllRefUser = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/users/getAllRef");
