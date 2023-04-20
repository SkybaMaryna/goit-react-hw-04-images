import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '34782015-10a3599984749068d4803df7b';

export const getImages = (searchQuery, page) => {
  return axios
    .get(
      `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then(response => {
      return response.data;
    });
};
