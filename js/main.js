const log = console.log;
const baseUrl = 'https://jsonplaceholder.typicode.com';
const postsEndpoint = '/posts';
const userEndpoint = '/users';
const albumsEndpoint = '/albums';

document.addEventListener('DOMContentLoaded', init);

function init() {
  //DOM is ready
  addListeners();
}

function addListeners() {
  document.querySelector('header h1').addEventListener('click', getData);
}

function getData() {
  //make a fetch call
}

function buildContent(arr) {
  //add content to page
  const section = document.querySelector('.content');
}
