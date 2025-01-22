import axios from 'axios';


export const dashAxios = axios.create({
    //baseURL: 'http://localhost:4000/api/',
    //baseURL: 'http://192.168.0.25:4000/api/',
    baseURL: 'https://backend-lgs-git-main-arielmedinas-projects.vercel.app/api/',
    timeout: 12000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        'x-token-data': localStorage.getItem('tokenRc'),
    }
    return  config;
});
