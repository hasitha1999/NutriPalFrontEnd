import server from "../config/server";

export const saveAsset = ( amount, paymentType) =>
  server.post(
    process.env.REACT_APP_API_BASE_URL +
      "/Assets/" +
      paymentType +
      "/"+
      amount
  );
export const saveBonus = (amount) =>
  server.post(process.env.REACT_APP_API_BASE_URL + "/Assets/Bonus/" + amount);
