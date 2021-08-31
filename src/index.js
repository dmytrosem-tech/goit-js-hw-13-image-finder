import './css/styles.css';
import refs from './js/refs.js';
import fPictures from './js/apiService.js';
import picsListTpl from './template/picturesListTpl.hbs';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basiclightbox.min.css';

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

  setTimeout(() => rClass(), 2000);

  setTimeout(() => onScroll(), 1000);

  console.log('lol');
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

// Коллбек клика по кнопке RESET ----------------------------------------------------------------->
function onRes() {
  refs.gallery.innerHTML = '';
  refs.loadMore.classList.add('is-hidden');
  refs.upArrow.classList.add('is-hidden');
}

// Рендер карточки картинки----------------------------------------------------------------------->
function renderMurkup(arr) {
  if (arr.length > 1) {
    const markup = picsListTpl(arr.map(item => item));
    refs.gallery.insertAdjacentHTML('beforeend', markup);
  } else if ((arr = [])) {
    refs.searchField.value = '';
    refs.gallery.innerHTML = '';

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
    refs.gallery.innerHTML = '';
  }
}

// Очищаем поле поиска после ошибки--------------------------------------------------------------->
function errRes(res) {
  refs.gallery.innerHTML = '';
}

// Коллбек снимающий класс невидимости с кнопки "Загрузи еще" и стрелки "Вверх"------------------------------------->
function rClass() {
  refs.loadMore.classList.remove('is-hidden');
  refs.upArrow.classList.remove('is-hidden');
}

// Коллбек плавного скролла к кнопке "Загрузи еще------------------------------------------------>"
function onScroll() {
  refs.loadMore.scrollIntoView({ bloc: 'center', behavior: 'smooth' });
}

// Слушатели-------------------------------------------------------------------------------------->
refs.form.addEventListener('submit', onInput);
refs.reset.addEventListener('click', onRes);
refs.loadMore.addEventListener('click', onInput);
refs.gallery.addEventListener('click', onImgClick);
