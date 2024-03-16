import server from "../config/server";

export const getAccountBalance = (userId) =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/users/total/" + userId);
