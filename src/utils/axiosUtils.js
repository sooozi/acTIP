import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env['API_URI'],
});

export const getAxios = (url) => {
  return instance.get(url);
};

export const postAxios = (url) => {
  return instance.post(url);
};

export const putAxios = (url) => {
  return instance.put(url);
};

export const deleteAxios = (url) => {
  return instance.delete(url);
};
