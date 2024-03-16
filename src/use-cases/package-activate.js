import server from "../config/server";

export const packageActive = (id) =>
  server.put(
    process.env.REACT_APP_API_BASE_URL +
      "/packages/" +
      id,
  );
