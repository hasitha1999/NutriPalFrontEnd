import server from "../config/server";

export const changePassword = (data) =>
  server.post(
    process.env.REACT_APP_API_BASE_URL + `/auth/passwordChange`,
    data
  );
