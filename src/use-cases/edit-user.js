import server from "../config/server";


export const editUser = (user) => server.put(process.env.REACT_APP_API_BASE_URL + '/users', user);