import server from "../config/server";

export const getRefComUser = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/Assets/ActivityIncome");
