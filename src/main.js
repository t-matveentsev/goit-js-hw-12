import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from './js/render-functions.js';
import { getInform } from './js/pixabay-api.js';

const form = document.querySelector('.form-inline');
const list = document.querySelector('.js-list');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.btn-load');

form.addEventListener('submit', searchImages);
loadMoreBtn.addEventListener('click', imagesMore);

function loaderShow() {
  loader.classList.toggle('is-visible');
}

function btnShow() {
  loadMoreBtn.classList.toggle('load-more');
}

const lightbox = new SimpleLightbox('.images a', {
  captionsData: 'alt',
  captionDelay: 250,
});

let page = 1;
let totalPages = 0;
let searchInput = '';

async function searchImages(evt) {
  evt.preventDefault();
  list.innerHTML = '';
  page = 1;

  const { query } = evt.currentTarget.elements;
  searchInput = query.value.trim();

  if (searchInput === '') {
    iziToast.error({
      title: 'Error',
      message: 'The field cannot be empty!!!',
      position: 'topRight',
    });
    return;
  }

  loaderShow();

  try {
    const data = await getInform(searchInput, page);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: '',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();
    totalPages = Math.ceil(data.totalHits / 15);
    if (page <= totalPages) {
      btnShow();
    }
    form.reset();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loaderShow();
  }
}

async function imagesMore() {
  page += 1;
  loaderShow();

  try {
    const data = await getInform(searchInput, page);
    list.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    lightbox.refresh();

    if (page === totalPages) {
      btnShow();
      return iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while fetching data. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loaderShow();
  }
}
