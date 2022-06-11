import axios from 'axios';

export const api = axios.create({
    baseURL: "https://deploy-appcatalog.herokuapp.com/",
});

export const AUTH_TOKEN = 'Basic QWRtaW46UGljMTZmNjI4QUBA';