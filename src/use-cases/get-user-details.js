import server from "../config/server";

export const getUserDetails = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/auth/getUserById");

export const getAllergiesDetails = () =>
  server.get(process.env.REACT_APP_API_BASE_URL + "/auth/getAllAllergies");
