import axios from "axios";

export const verifyEmail = (verificationToken) => axios.post(process.env.REACT_APP_API_BASE_URL + `/auth/email-verification/${verificationToken}`);