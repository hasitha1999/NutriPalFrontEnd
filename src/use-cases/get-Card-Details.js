import server from "../config/server";

export const getCardDetails = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/users/getCardDeatils");

export const saveCardDetails = (details) =>
  server.put(process.env.REACT_APP_API_BASE_URL + "/users/putCardDatails",details);
