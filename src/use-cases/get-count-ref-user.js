import server from "../config/server";

export const getcountRefUser = async () => {
  return server.get(process.env.REACT_APP_API_BASE_URL + "/users/getCountRef/1");
};

export const getcountRefUserbylevel = async (level) => {
  server.get(
    process.env.REACT_APP_API_BASE_URL + "/users/getCountRef/" + level
  );
};
