import axios from 'axios';

const myAxios = axios.create();
myAxios.defaults.baseURL = 'http://localhost:7777/my-app/api';
myAxios.defaults.responseType = 'json';
//myAxios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
//myAxios.defaults.headers.post['Content-Type'] = 'json/application';

export default myAxios;