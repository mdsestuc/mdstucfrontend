import axios from 'axios';


export const dashAxios = axios.create({
    //baseURL: 'http://localhost:4000/api/',
    baseURL: 'http://10.100.111.165:4000/api/',
    timeout: 12000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        'x-token-data': localStorage.getItem('tokenRc'),
    }
    return  config;
});
