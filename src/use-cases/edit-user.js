import server from "../config/server";


export const editUser = (user) => server.post(process.env.REACT_APP_API_BASE_URL + '/auth/createOrUpdateUser', user);