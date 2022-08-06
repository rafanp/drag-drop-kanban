import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = async (request: any) => {
  // const accessToken = await localStorageService.get(ACCESS_TOKEN_KEY);
  const accessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGV0c2NvZGUiLCJpYXQiOjE2NTk4MjE2MDUsImV4cCI6MTY1OTgyNTIwNX0.2LcVX2wIceDoTvsX7zf4ZbPwYSOXY5h9QNlHeIhqVh4';

  // if (!accessToken && !request.auth) {
  //     window.location.replace('#/login');
  //     return Promise.reject('unauthorized');
  // }

  const authorizationHeader = 'Bearer ' + accessToken;
  request.headers['Authorization'] = authorizationHeader;

  return request;
};

// api.interceptors.request.use((config) => {
//   // Declaramos um token manualmente para teste.
//   const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGV0c2NvZGUiLCJpYXQiOjE2NTk4MDYzMDUsImV4cCI6MTY1OTgwOTkwNX0.Ks8nxf1P4jFHjEU3ZosAVLJoCB58QXTdi7fwhCLhuKk';

//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     // axios.defaults.headers.common['Authorization'] = Bearer ${localStorage.getItem('token')};
//   }

//   return config;
// });

api.interceptors.request.use(request);

export default api;
