import server from "../config/server";

export const getPackageUser = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/users/package");
