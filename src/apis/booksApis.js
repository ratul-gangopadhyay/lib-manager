import axios from 'axios';

export const getAllBooks = () => axios.get('http://localhost:4000/books', {});

export const patchBook = (id, patchPayload) =>
  axios.patch(`http://localhost:4000/books/${id}`, patchPayload);
