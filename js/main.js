const log = console.log;
const baseUrl = 'https://jsonplaceholder.typicode.com';
const postsEndpoint = '/posts';
const userEndpoint = '/users';
const albumsEndpoint = '/albums';
const sampleImageUrl = 'https://picsum.photos/400';
const dogURL = 'https://dog.ceo/api/breeds/image/random';

document.addEventListener('DOMContentLoaded', init);

function init() {
  //DOM is ready
  addListeners();
}

function addListeners() {
  document.querySelector('header h1').addEventListener('click', getData3);
}

function getData3() {
  const url = 'http://127.0.0.1:5500/data.xml';
  fetch(url)
    .then(extractTEXT)
    .then(buildContent3)
    .catch((err) => {
      log(err);
    });
}
function extractTEXT(response) {
  if (!response.ok) throw new Error('Bad XML :(');
  return response.text(); //extract the raw String from the body
}
function buildContent3(xmlText) {
  const parser = new DOMParser();
  //DOMParser can take a string and turn it into a DOM object
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  const section = document.querySelector('section');

  const characters = xmlDoc.querySelectorAll('character');
  console.log(characters);
  let html = '';
  characters.forEach((char) => {
    const actor = char.getAttribute('actor');
    const name = char.textContent;
    html += `<div class="character">
      <h3>${actor}</h3>
      <p>${name}</p>
    </div>`;
  });
  section.innerHTML = html;
}

function getData2() {
  // const url = 'http://127.0.0.1:5500/img/608-400.jpg';
  const url = 'https://picsum.photos/400';
  // const url = 'https://http.cat/images/308.jpg';
  //GET request for an IMAGE
  fetch(url)
    .then(extractBLOB)
    .then(buildContent2)
    .catch((err) => {
      log(err);
    });
}
function extractBLOB(response) {
  if (!response.ok) throw new Error('No such image...');
  return response.blob();
}
function buildContent2(blob) {
  //blob is an address in the heap where the binary data is saved
  log(blob);
  const src = URL.createObjectURL(blob);
  log(src);
  const img = document.createElement('img');
  img.src = src;
  document.querySelector('section').append(img);
}

function getData1() {
  const url = baseUrl + postsEndpoint; //GET request for all 'posts'
  fetch(url)
    .then(extractJSON)
    .then(buildContent1)
    .catch((err) => {
      log(err);
    });
}
function extractJSON(response) {
  if (!response.ok) throw new Error('Not enough cheese');
  return response.json();
}
function buildContent1(data) {
  log(data);
  const section = document.querySelector('.content');
  section.innerHTML = data
    .map((post) => {
      return `<div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    </div>`;
    })
    .join('');
}

function getData() {
  //make a fetch call

  //use a String as the URL
  //fetch(dogURL)
  //fetch(url)
  //fetch(req)
  //use a URL object
  const url = new URL(dogURL);
  const req = new Request(url);
  fetch(req)
    .then((response) => {
      // log(response);
      if (!response.ok) throw new Error('Status was NOT 200...');
      return response.json();
      //wait for the body... then turn the JSON String into a JS Object
      //pass the JS object to the next .then()
      // throw new Error('Not enough cheese');
    })
    .then((data) => {
      //handle the data
      log(data);
      buildContent(data.message); //the dog image url
    })
    .catch((err) => {
      //handle the error
      log(err);
    });
}
function buildContent(dogimg) {
  //add content to page
  const section = document.querySelector('.content');
  // section.textContent = dogimg; //this replaces everything inside section
  let img = document.createElement('img');
  img.addEventListener('load', (ev) => {
    section.append(img);
  });
  img.addEventListener('error', (ev) => {
    //image failed to load
  });
  img.src = dogimg;
}
