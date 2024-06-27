import server from "../config/server";

export const getWeekWaterIntakeData = () =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/daily-log/getWeekWaterIntakeData`,

    );