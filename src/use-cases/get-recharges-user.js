import server from "../config/server";

export const getRechagesUser = () =>
  server.get(
    process.env.REACT_APP_API_BASE_URL + "/Assets/Recharge"
  );
