import server from "../config/server";


export const getNutritionsAPIData = (data) =>
    server.post(`https://api.edamam.com/api/nutrition-details?app_id=47379841&app_key=d28718060b8adfd39783ead254df7f92`,data

    );