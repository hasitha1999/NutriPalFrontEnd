import server from "../config/server";


export const getDailyLogDataListByMonth = (type) =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/daily-log/getDailyLogDataListByMonth/${type}`,

    );