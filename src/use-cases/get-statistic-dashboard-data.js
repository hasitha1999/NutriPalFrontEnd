import server from "../config/server";


export const getStatisticDashboardData= () =>
    server.post(
        process.env.REACT_APP_API_BASE_URL + `/dashboard/getStatisticDashboardData`,

    );