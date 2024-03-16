import server from "../config/server";

export const getWithdrwalsUser = () =>
  server.get(
    process.env.REACT_APP_API_BASE_URL + "/Assets/Withdrawals"
  );
