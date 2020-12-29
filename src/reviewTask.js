import gallery from './gallery-items.js';

const refs = {
  galleryBox: document.querySelector('.js-gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  openModalBtn: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};
let index = 0;
// const createGallery = item => {
const createGallery = (item, index) => {
  // переменная index изменена на локальную
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

  imageRef.setAttribute('data-index', (index += 1));
  linkRef.appendChild(imageRef);

  listRef.appendChild(linkRef);

  return listRef;
};

// const itemsGallery = gallery.map(galleryItem => createGallery(galleryItem));
const itemsGallery = gallery.map(createGallery);
// Метод массива map передает в функцию сразу 3 параметра: значение, порядковый индекс, сам массив
// именно это мы используем в createGallery(item, index), где ожидаем,
// что вторым параметром прийдет нужный нам индекс
// Поскольку мы принимаем нужные параметры в требуемом порядке - можно не создавать анонимную функцию,
// а передать ссылку на уже существующую.
refs.galleryBox.append(...itemsGallery);
console.log(refs.galleryBox);

refs.galleryBox.addEventListener('click', onGalleryClick);
refs.closeModalBtn.addEventListener('click', onCloseModal);
// refs.overlay.addEventListener('click', onOverlayClick);
refs.overlay.addEventListener('click', onCloseModal);
// в данному случае, оверлей не имеет вложенных элементов и
// дополнительный контроль event.target === event.currentTarget не нужен

function onGalleryClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  const largeImgUrl = event.target.dataset.source;
  const largeImgAlt = event.target.alt;
  // данный код используется в нескольких местах, а значит его желательно вынести в отдельную функцию
  // refs.largeImage.src = largeImgUrl;
  // refs.largeImage.alt = largeImgAlt;
  setLargeImage(largeImgUrl, largeImgAlt);
  //   onOpenModal(event);
  // }
  // function onOpenModal(event) {
  //   if (event.target.nodeName === 'IMG') {
  refs.openModalBtn.classList.add('is-open');
  //   }
  window.addEventListener('keydown', onPressEscape);
  // приведение типа (+event.target.dataset.index) в данном случае не обязательно
  // index = +event.target.dataset.index - 1;
  index = event.target.dataset.index - 1;
  window.addEventListener('keydown', onSwitchPicture);
}
// функция для установки атрибутов largeImage
function setLargeImage(imageUrl, imageDescription) {
  refs.largeImage.src = imageUrl;
  refs.largeImage.alt = imageDescription;
}
function onSwitchPicture(event) {
  // данные условия можно упростить
  // if (event.code === 'ArrowRight') {
  //   if (index >= gallery.length - 1) {
  //     return;
  //   }
  // не забывайте, что нужно изменять и значение атрибута alt
  // refs.largeImage.src = gallery[(index += 1)].original;
  if (event.code === 'ArrowRight' && index < gallery.length - 1) {
    setLargeImage(gallery[(index += 1)].original, gallery[index].description);
    // } else if (event.code === 'ArrowLeft') {
    //   if (index === 0) {
    //     return;
    //   }
    // refs.largeImage.src = gallery[(index -= 1)].original;
  } else if (event.code === 'ArrowLeft' && index > 0) {
    setLargeImage(gallery[(index -= 1)].original, gallery[index].description);
  }
}
function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onSwitchPicture); // этот слушатель ведь тоже необходимо удалять
  refs.openModalBtn.classList.remove('is-open');
  // refs.largeImage.src = ''; - теперь для этого есть уже отдельная функция
  // refs.largeImage.alt = '';
  setLargeImage('', '');
}
// данная функция уже не нужна
// function onOverlayClick(event) {
//   if (event.target === event.currentTarget) {
//     onCloseModal();
//   }
// }
function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}
