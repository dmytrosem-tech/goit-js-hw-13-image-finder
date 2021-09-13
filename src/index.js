import './css/styles.css';
import refs from './js/refs.js';
import fPictures from './js/apiService.js';
import picsListTpl from './template/picturesListTpl.hbs';
import { alert, info, success, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
// import fEvents from './js/api2.js';
// import evTpl from './template/evTpl.hbs';

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

  // setTimeout(() => onScroll(), 1500);
  // setTimeout(() => targetEl.classList.remove('hidden'), 1000);

  // fEvents()
  // .then(ren)
  // .catch(err => console.log(err))
}

// // временно сюда поставлю, это тренировка апи--------
// function ren (arr) {
//   console.log(arr);
//   const markup2 = evTpl(arr.map(item => item))
//   refs.gallery.insertAdjacentHTML('beforeend', markup2);
// }

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
  // refs.loadMore.classList.add('is-hidden');
  targetEl.classList.add('hidden');
}

// Рендер карточки картинки----------------------------------------------------------------------->
function renderMurkup(arr) {
  if (arr.length > 1) {
    const markup = picsListTpl(arr.map(item => item));
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    // setTimeout(() => rClass(), 2000);
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
    // refs.loadMore.classList.add('is-hidden');
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

// // Коллбек снимающий класс невидимости с кнопки "Загрузи еще" и стрелки "Вверх"------------------------------------->
// function rClass() {
//   // refs.loadMore.classList.remove('is-hidden');
//   refs.up.classList.remove('is-hidden');
// }

// // Коллбек плавного скролла к кнопке "Загрузи еще------------------------------------------------>"
// function onScroll() {
//   // refs.loadMore.scrollIntoView({ block: 'end', behavior: 'smooth' });
//   refs.body.scrollIntoView({ block: 'center', behavior: 'smooth' });
// }

// Функции для стрелки, появление и логика-------------------------------------------------------->
function trackScroll() {
  var scrolled = window.pageYOffset;
  var coords = document.documentElement.clientHeight;

  if (scrolled > coords) {
    refs.up.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    refs.up.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 20);
  }
}

// Бусконечный Скролл ---------------------------------------------------------------------->
const entry = entries => {
  const inputValue = refs.searchField.value;
  entries.forEach(entry => {
    if (entry.isIntersecting && inputValue !== '') {
      if (page === 1) {
        page = 2;
      }
      fPictures(inputValue, baseApi, myApiKey, page)
        .then(renderMurkup)
        .then(page++)
        .catch(errRes);
    }
  });
};
const observer = new IntersectionObserver(entry, {
  rootMargin: '180px',
});
observer.observe(refs.intersector);

// Слушатели-------------------------------------------------------------------------------------->
refs.form.addEventListener('submit', onInput);
refs.reset.addEventListener('click', onRes);
refs.gallery.addEventListener('click', onImgClick);

window.addEventListener('scroll', trackScroll);
refs.up.addEventListener('click', backToTop);
// refs.loadMore.addEventListener('click', onInput);
