import server from "../config/server";


export const changeUserStatus = (userId) => server.put(process.env.REACT_APP_API_BASE_URL + '/users/change-status/' + userId);