import server from "../config/server";


export const getAllNotAcceptedAssets = (pageNumber, pageSize, globalFilter) => 
server.get(process.env.REACT_APP_API_BASE_URL + `/adminAction/getAllNotAcceptedAssets?pageNumber=${pageNumber}&pageSize=${pageSize}&globalFilter=${globalFilter}`);