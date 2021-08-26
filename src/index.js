import './css/styles.css';
import refs from './js/refs.js';
import fPictures from './js/apiService.js';
import picsListTpl from './template/picturesListTpl.hbs';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';

// Переменная для смены страницы и переменные для вввода в запрос АРI----------------------------->
let page = 1;
const baseApi = 'https://pixabay.com/api/';
const myApiKey = '22969021-19f1494240440c9eacf690dfa';

// Коллбек сабмита на поле ввода------------------------------------------------------------------>
function onInput(e) {
  e.preventDefault();

  const inputValue = refs.searchField.value;

  if (!inputValue.trim()) {
    alert({
      title: 'Hmm...',
      text: 'Enter something :)',
      delay: 3000,
    });
    return;
  }

  fPictures(inputValue, baseApi, myApiKey, page)
    .then(renderMurkup)
    .then(page++)
    .catch(errRes);
}

// Коллбек клика по картинке---------------------------------------------------------------------->
function onImgClick(e) {
  if (e.target.nodeName !== 'IMG') return;
  console.log('lol');
  const imgURL = e.target.dataset.largeimg;
  basicLightbox
    .create(
      `<div class="modal">
		<img width="1200" src="${imgURL}">
        </div>
	`,
    )
    .show();
  console.log(imgURL);
}

// Рендер карточки картинки----------------------------------------------------------------------->
function renderMurkup(arr) {
  if (arr.length > 1) {
    const markup = picsListTpl(arr.map(item => item));
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  } else if ((arr = [])) {
    refs.searchField.value = '';
    refs.container.innerHTML = '';

    const errNotify = error({
      text: 'Pictures not found. Please enter a more specific query.',
      delay: 2000,
      addClass: 'notify-err',
      closer: false,
      sticker: false,
    });
  } else if (result.status === 404) {
    const errNotify = error({
      text: 'Оппа',
      delay: 2000,
      addClass: 'notify-err',
      closer: false,
      sticker: false,
    });
    refs.container.innerHTML = '';
  }
}

// Очищаем поле поиска после ошибки--------------------------------------------------------------->
function errRes(res) {
  refs.container.innerHTML = '';
}

// Слушатели-------------------------------------------------------------------------------------->
refs.form.addEventListener('submit', onInput);
refs.loadMore.addEventListener('click', onInput);
refs.gallery.addEventListener('click', onImgClick);
