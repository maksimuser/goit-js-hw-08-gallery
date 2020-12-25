import gallery from './gallery-items.js';

const refs = {
  galleryBox: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  openModalBtn: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

const createGallery = item => {
  const listRef = document.createElement('li');
  listRef.classList.add('gallery__item');

  const linkRef = document.createElement('a');
  linkRef.classList.add('gallery__link');
  linkRef.setAttribute('href', item.original);

  const imageRef = document.createElement('img');
  imageRef.classList.add('gallery__image');
  imageRef.setAttribute('src', item.preview);
  imageRef.setAttribute('data-source', item.original);
  imageRef.setAttribute('alt', item.description);

  linkRef.appendChild(imageRef);
  listRef.appendChild(linkRef);

  return listRef;
};

const itemsGallery = gallery.map(galleryItem => createGallery(galleryItem));

refs.galleryBox.append(...itemsGallery);
console.log(refs.galleryBox);

refs.galleryBox.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayClick);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;

  refs.largeImage.src = largeImgUrl;
  refs.largeImage.alt = largeImgAlt;

  onOpenModal(event);
}

function onOpenModal(event) {
  if (event.target.nodeName === 'IMG') {
    refs.openModalBtn.classList.add('is-open');
  }

  window.addEventListener('keydown', onPressEscape);
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  refs.openModalBtn.classList.remove('is-open');
  refs.largeImage.src = '';
  refs.largeImage.alt = '';
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
