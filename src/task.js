import gallery from './gallery-items.js';

const refs = {
  galleryBox: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  openModalBtn: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

let index = 0;

const createGallery = (item, index) => {
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

  imageRef.setAttribute('data-index', index);

  linkRef.appendChild(imageRef);
  listRef.appendChild(linkRef);

  return listRef;
};

const itemsGallery = gallery.map(createGallery);

refs.galleryBox.append(...itemsGallery);
console.log(refs.galleryBox);

refs.galleryBox.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onCloseModal);

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;

  setLargeImage(largeImgUrl, largeImgAlt);

  refs.openModalBtn.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);

  index = +event.target.dataset.index;
  console.log(index);
  window.addEventListener('keydown', onSwitchPicture);
}

function setLargeImage(imageUrl, imageDescription) {
  refs.largeImage.src = imageUrl;
  refs.largeImage.alt = imageDescription;
}

function onSwitchPicture(event) {
  if (event.code === 'ArrowRight' && index < gallery.length - 1) {
    setLargeImage(gallery[(index += 1)].original, gallery[index].description);
  } else if (event.code === 'ArrowLeft' && index > 0) {
    setLargeImage(gallery[(index -= 1)].original), gallery[index].description;
  }
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onSwitchPicture);
  refs.openModalBtn.classList.remove('is-open');
  setLargeImage('', '');
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
