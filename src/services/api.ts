import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const request = async (request: any) => {
  const accessToken = localStorage.getItem('accessToken');

  const authorizationHeader = 'Bearer ' + accessToken;
  request.headers['Authorization'] = authorizationHeader;

  return request;
};

const response = async (res: any) => {
  return res;
};

const responseError = async (error: any) => {
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

      return axios(originalRequest);
    } catch (error) {
      console.error('Error', error);
    }
  }

  return Promise.reject(error);
};

api.interceptors.response.use(response, responseError);
api.interceptors.request.use(request);

export default api;
