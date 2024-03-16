import server from "../config/server";


export const acceptAsset = (data) =>
  server.put(
    process.env.REACT_APP_API_BASE_URL + `/adminAction/accept-asset`,
    data
  );