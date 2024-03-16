import server from "../config/server";


export const rejectAsset = (data) =>
  server.put(
    process.env.REACT_APP_API_BASE_URL + `/adminAction/reject-asset`,
    data
  );