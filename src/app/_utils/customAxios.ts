import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DEV_ENDPOINT;

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const axiosAuth = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
