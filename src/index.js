import './sass/main.scss';
import axios from 'axios';

const refs = {
  form: document.querySelector('#form'),
  searchField: document.querySelector('#search'),
  container: document.querySelector('.container'),
};
let page = 1;

const onSubmit = e => {
  e.preventDefault();
  const submitValue = refs.searchField.value;
  const baseApi = 'https://api.github.com';
  const myGitId = '67a962bb74ca1bbfdc52';
  const secretClient = '806def03bea1bb0c19b5389bde86a3ff499a2200';
  fetch(
    `${baseApi}/search/repositories?q=${submitValue}&client_id=${myGitId}&client_secret=${secretClient}&page=${page}`,
  )
    .then(resp => resp.json())
    .then(data => renderCollection(data.items))
    .catch(err => console.log(err));
};

function createElementHtml({ description, owner, created_at, name, html_url, watchers_count }) {
  const article = `<div class='repository'>
  <h1 class='owner-title'>Owners name: ${owner.login}</h1>
    <h2 class='rep-title'>Repository title: ${name}</h2>
        <article class='rep__info'>
          <img src='${owner.avatar_url}' alt='owner' class='owner__avatar'/>
          <p class='owner__rep-create-date'>Created date: ${created_at}</p>
          <p class='owner__watchers-count'>Watchers count: ${watchers_count}</p>
          <a href='${html_url}' target='_blank'>Go repository</a>

        </article>
        </div>
          
    `;
  refs.container.insertAdjacentHTML('beforeend', article);
}

function renderCollection(arr) {
  arr.forEach(el => createElementHtml(el));
}

refs.form.addEventListener('submit', onSubmit);
