import axios from "axios";

export const getPrediction = (Data) => axios({
    method: "post",
    url: "http://34.93.134.127/predict",
    data: Data,
    headers: { "Content-Type": "multipart/form-data" },
  }) ;


