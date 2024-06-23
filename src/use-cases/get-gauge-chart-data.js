import server from "../config/server";


export const getGaugeChartData= () =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/dashboard/getGaugeChartData`,

    );