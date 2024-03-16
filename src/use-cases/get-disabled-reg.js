import axios from "axios";

export const getDisabledReg = () =>
  axios.get(process.env.REACT_APP_API_BASE_URL + "/app-config/DISABLE_REG_AND_NEW_PKG");
