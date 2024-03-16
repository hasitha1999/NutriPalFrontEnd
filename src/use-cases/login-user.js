import axios from "axios";

export const loginUser = (userData) => axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/login', userData);