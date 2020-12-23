import gallery from './gallery-items.js';
// console.log(gallery[0].description);

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
// console.log(itemsGallery);

galleryRef.append(...itemsGallery);
console.log(galleryRef);
