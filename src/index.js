import './sass/main.scss';
import createMarkup from './templates/markup-tpl.hbs';
import axios from 'axios';

const refs = {
  form: document.querySelector('#form'),
  searchField: document.querySelector('#search'),
  container: document.querySelector('.container'),
  loadMore: document.querySelector('#more'),
};
let currentPage = 1;

const onSubmit = e => {
  e.preventDefault();
  const submitValue = refs.searchField.value;
  const baseApi = 'https://api.github.com';
  const myGitId = '67a962bb74ca1bbfdc52';
  const secretClient = '806def03bea1bb0c19b5389bde86a3ff499a2200';
  axios
    .get(
      `${baseApi}/search/repositories?q=${submitValue}&client_id=${myGitId}&client_secret=${secretClient}&page=${currentPage}`,
    )
    .then(result => renderCollection(result.data.items))
    .then(() => currentPage++)
    .catch(err => console.log(err));
};

function renderCollection(arr) {
  arr.forEach(el => {
    refs.container.insertAdjacentHTML('beforeend', createMarkup(el));
  });
}

refs.form.addEventListener('submit', onSubmit);
refs.loadMore.addEventListener('click', onSubmit);
