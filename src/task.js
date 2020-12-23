import gallery from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');

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

galleryRef.append(...itemsGallery);
console.log(galleryRef);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения
galleryRef.addEventListener('click', onGalleryClick);
const largeImage = document.querySelector('.lightbox__image');

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;

  //   console.log('largeImgUrl: ', largeImgUrl);
  largeImage.src = largeImgUrl;
  largeImage.alt = largeImgAlt;
  //   console.log(largeImage);
}

// Открытие модального окна по клику на элементе галереи
const openModalBtn = document.querySelector('.js-lightbox');
openModalBtn.classList.add('is-open');

const closeModalBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);

closeModalBtn.addEventListener('click', () => {
  openModalBtn.classList.remove('is-open');
});
