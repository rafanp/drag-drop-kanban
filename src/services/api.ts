import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = async (request: any) => {
  // const accessToken = await localStorageService.get(ACCESS_TOKEN_KEY);
  const accessToken = localStorage.getItem('accessToken');
  // console.log('request :', request);
  // if (!accessToken) {
  //   // window.location.replace('#/login');
  //   throw new Error('unauthorized');
  //   // return Promise.reject('unauthorized');
  // }

  const authorizationHeader = 'Bearer ' + accessToken;
  request.headers['Authorization'] = authorizationHeader;

  return request;
};

const response = async (res: any) => {
  return res;
};

const responseError = async (error: any) => {
  console.log('error :', error);
  if (!error.response || !error.response.data) {
    return Promise.reject(error);
  }

  const originalRequest = error.config;
  if (error.response.status === 401) {
    try {
      const response = await api.post('/login', {
        login: 'letscode',
        senha: 'lets@123',
      });

      const accessToken = response.data;
      const authorizationHeader = 'Bearer ' + accessToken;
      originalRequest.headers['Authorization'] = authorizationHeader;

      localStorage.setItem('accessToken', accessToken);

      console.log('response', response);
      return axios(originalRequest);
    } catch (error) {
      console.error('Error', error);
    }
  }

  // const refreshToken = await localStorageService.get(REFRESH_TOKEN_KEY);

  return Promise.reject(error);
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

api.interceptors.response.use(response, responseError);
api.interceptors.request.use(request);

export default api;
