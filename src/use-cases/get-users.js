import server from "../config/server";

export const getUsers = async (pageNumber, pageSize, globalFilter) =>
  server.get(
    process.env.REACT_APP_API_BASE_URL +
      `/users?pageNumber=${pageNumber}&pageSize=${pageSize}&globalFilter=${globalFilter}`
  );
