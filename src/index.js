import './css/styles.css';
import './css/preloader.css';
import LoadMoreBtn from './js/load-more-btn ';
import ApiService from './js/apiService';
import imgsTemplate from './templates/image-card.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import preloaderFactory from './js/preloader';
import getAllRefs from './js/refs';

defaults.animateSpeed = 'fast';

const preloader = preloaderFactory('.preloader');
const allRefs = getAllRefs();
const apiImg = new ApiService();
const loadBtn = new LoadMoreBtn({
  selector: "[data-action='load-more']",
  hidden: true,
});

allRefs.formRef.addEventListener('submit', onSearch);
loadBtn.refs.button.addEventListener('click', fetchImgs);
allRefs.listRef.addEventListener('click', onImgClick);

preloader.hide();

function onSearch(e) {
  e.preventDefault();
  clearGallery();
  const inputQuery = e.currentTarget.elements.query.value;
  apiImg.query = inputQuery.trim();

  loadBtn.show();
  apiImg.resetPage();
  clearGallery();
  fetchImgs();
  e.currentTarget.reset();

  scrollImg(e);
}

async function fetchImgs() {
  loadBtn.disable();

  try {
    preloader.show();
    const img = await apiImg.fetchImages();
    renderImgs(img);
  } catch (error) {
    console.log(error);
    onError();
  }

  loadBtn.enable();
  preloader.hide();
}

function onImgClick(e) {
  const image = e.target;

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(
    `<img src="${image.dataset.source}" width="700" height="500">`,
    {
      closable: true,
    },
  );

  instance.show();
}

function onError() {
  error({
    text: 'Try again, error',
    type: ' error',
    animateSpeed: 'fast',
  });
}

function clearGallery() {
  allRefs.listRef.innerHTML = '';
}

function renderImgs(img) {
  allRefs.listRef.insertAdjacentHTML('beforeend', imgsTemplate(img));
}

function scrollImg(e) {
  window.scrollTo({
    top: e.pageY,
    left: 0,
    behavior: 'smooth',
  });
}
