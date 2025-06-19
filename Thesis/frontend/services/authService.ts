import api from './api';
import * as SecureStore from 'expo-secure-store';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/sign-in', { email, password });
  const token = res.data.data.access_token;
  await SecureStore.setItemAsync('token', token);
  return token;
};

export const register = async (email: string, password: string) => {
  const res = await api.post('/auth/sign-up', { email, password });
  const token = res.data.data.access_token;
  await SecureStore.setItemAsync('token', token);
  return token;
};

export const logout = async () => {
  await SecureStore.deleteItemAsync('token');
};

export const updateEmail = async (newEmail: string) => {
  const token = await SecureStore.getItemAsync('token');
  const res = await api.post(
    '/auth/update-email',
    { email: newEmail },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const updatePassword = async (newPassword: string) => {
  const token = await SecureStore.getItemAsync('token');
  const res = await api.post(
    '/auth/update-password',
    { password: newPassword },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};