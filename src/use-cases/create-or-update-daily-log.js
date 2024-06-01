import server from "../config/server";


export const createOrUpdateDailyLog = (data) =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/daily-log/createOrUpdateDailyLog`, data

    );