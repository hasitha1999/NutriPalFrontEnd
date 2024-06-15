import server from "../config/server";


export const searchRecepieApi = (searchData) => server.get("https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q="+searchData+"&cuisineType=Indian");

export const saveRecepie = (Data) => server.post(process.env.REACT_APP_API_BASE_URL + '/recipe/save', Data);

export const savedSearchRecepieApi = (searchData) => server.get(`https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=${encodeURIComponent(searchData)}&app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9`);

export const getAllsavedRecepie = () => server.post(process.env.REACT_APP_API_BASE_URL + '/recipe/getAllSavedRecipes');