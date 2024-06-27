import server from "../config/server";

export const getAverageWaterIntake = (data) =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/daily-log/getAverageWaterValue`, data

    );