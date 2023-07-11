import axios from 'axios';

export const getAllUsers = () => axios.get('http://localhost:4000/users', {});

export const getUser = (id) => axios.get(`http://localhost:4000/users/${id}`, {});

export const addNewUser = (newUser) => axios.post('http://localhost:4000/users', newUser);

export const patchUser = (id, patchPayload) =>
  axios.patch(`http://localhost:4000/users/${id}`, patchPayload);