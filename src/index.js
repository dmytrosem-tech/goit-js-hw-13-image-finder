import './css/styles.css';
import refs from './js/refs.js';
import fPictures from './js/apiService.js';
import picsListTpl from './template/picturesListTpl.hbs';

import error from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

// Переменная для смены страницы и переменные для вввода в запрос АРI----------------------------->
let page = 1;
const baseApi = 'https://pixabay.com/api/';
const myApiKey = '22969021-19f1494240440c9eacf690dfa';

// Коллбек сабмита на поле ввода------------------------------------------------------------------>
function onInput(e) {
  e.preventDefault();

  const inputValue = refs.searchField.value;

  fPictures(inputValue, baseApi, myApiKey, page)
    .then(renderMurkup)
    .then(page++)
    .catch(errRes);
}

// Рендер карточки картинки----------------------------------------------------------------------->
function renderMurkup(arr) {
  const markup = picsListTpl(arr.map(item => item));
  refs.container.insertAdjacentHTML('beforeend', markup);
}

// Очищаем поле поиска после ошибки--------------------------------------------------------------->
function errRes(res) {
  refs.container.innerHTML = '';
}

// Слушатели-------------------------------------------------------------------------------------->
refs.form.addEventListener('submit', onInput);
refs.loadMore.addEventListener('click', onInput);
