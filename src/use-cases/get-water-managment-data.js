import server from "../config/server";


export const getWaterManagmentData = () =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + "/daily-log/getDailyLogByCurrentDate/Water",

    );