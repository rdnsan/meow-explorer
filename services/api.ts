import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'x-api-key': process.env.API_KEY ?? 'DEMO-API-KEY' },
});
