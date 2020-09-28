import arrayGalleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  galleryImage: document.querySelector('.gallery__image'),
  modalWindow: document.querySelector('.lightbox'),
  imageInModalWindow: document.querySelector('.lightbox__image'),
  buttonCloseModals: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const makeMarkupOfGalleryElements = arrayGalleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
  .join('');

refs.galleryList.insertAdjacentHTML('afterbegin', makeMarkupOfGalleryElements);

refs.galleryList.addEventListener('click', onGalleryImageClick);

function onGalleryImageClick(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.imageInModalWindow.src = '#';
  evt.preventDefault();
  const urlOfGalleryItem = evt.target.dataset.source;
  refs.modalWindow.classList.add('is-open');
  refs.imageInModalWindow.src = urlOfGalleryItem;
}

refs.buttonCloseModals.addEventListener('click', onButtonClick);

function onButtonClick() {
  refs.modalWindow.classList.remove('is-open');
}
