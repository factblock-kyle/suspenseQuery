import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DEV_ENDPOINT;

const customAxios = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default customAxios;
