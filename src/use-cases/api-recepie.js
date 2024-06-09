import server from "../config/server";


export const searchRecepieApi = (searchData) => server.get("https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q="+searchData+"&cuisineType=Indian");