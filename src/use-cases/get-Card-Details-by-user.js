import server from "../config/server";

export const getCardDetailsByUser = (userId) =>
  server.get(process.env.REACT_APP_API_BASE_URL + `/users/getCardDetailsByUser/${userId}`);
