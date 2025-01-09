import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default AxiosInstance;
