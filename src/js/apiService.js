import axios from 'axios';
export default function fPictures(inputValue, baseApi, myApiKey, page) {
  return axios.get(
    `${baseApi}?image_type=photo&orientation=horizontal&q=${inputValue}&page=${page}&per_page=12&key=${myApiKey}`,
  );
}
