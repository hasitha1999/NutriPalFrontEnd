import axios from "axios";

const server = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// server.interceptors.request.use(config => {
//     config.headers.Authorization = "Bearer " + sessionStorage.getItem("TOKEN")
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// server.interceptors.response.use(response => response, error => {
//     if(error.response?.status === 403){
//         sessionStorage.removeItem("TOKEN");
//         window.location.href = "/login?error=session-expired";
//     }

//     return Promise.reject(error);
// });

export default server;