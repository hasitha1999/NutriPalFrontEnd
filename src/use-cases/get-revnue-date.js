import server from "../config/server";

export const getRevenueDate = (timeStamp) =>
  server.get(
    process.env.REACT_APP_API_BASE_URL + "/Assets/Revenue/" + timeStamp
  );
