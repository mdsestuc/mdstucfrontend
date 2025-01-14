import axios from 'axios';


export const dashAxios = axios.create({
    //baseURL: 'http://localhost:4000/api/',
    //baseURL: 'http://192.168.0.20:4000/api/',
    baseURL: 'https://backendmds-bhim16sob-arielmedinas-projects.vercel.app/',
    timeout: 12000,
});

dashAxios.interceptors.request.use( config  => {

    config.headers = {
        ...config.headers,
        'x-token-data': localStorage.getItem('tokenRc'),
    }
    return  config;
});
