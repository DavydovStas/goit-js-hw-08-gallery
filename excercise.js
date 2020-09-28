import galleryItems from './gallery-items.js';

const makeMarkupOfGalleryElements = renderGalery();

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  galleryImage: document.querySelector('.gallery__image'),
  modalWindow: document.querySelector('.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  buttonCloseModals: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

refs.galleryList.insertAdjacentHTML('afterbegin', makeMarkupOfGalleryElements);

refs.galleryList.addEventListener('click', onGalleryImageClick);

refs.buttonCloseModals.addEventListener('click', onButtonCloseClick);

function renderGalery() {
  return galleryItems
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
}

function onGalleryImageClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalWindow.classList.add('is-open');
  refs.modalImage.src = evt.target.dataset.source;
}

function onButtonCloseClick() {
  refs.modalImage.src = '#';
  refs.modalWindow.classList.remove('is-open');
}
