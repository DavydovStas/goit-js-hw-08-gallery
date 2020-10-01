import galleryItems from './gallery-items.js';

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  galleryListItems: document.querySelectorAll('.gallery__item'),
  galleryImage: document.querySelector('.gallery__image'),
  modalWindow: document.querySelector('.lightbox'),
  modalImage: document.querySelector('.lightbox__image'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
  buttonCloseModals: document.querySelector(
    'button[data-action="close-lightbox"]',
  ),
};

const markupOfGallery = renderGalery();

refs.galleryList.insertAdjacentHTML('afterbegin', markupOfGallery);

refs.galleryList.addEventListener('click', onGalleryImageClick);

refs.buttonCloseModals.addEventListener('click', onButtonCloseClick);

refs.modalOverlay.addEventListener('click', onOverlayClick);

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
  document.addEventListener('keydown', onEscDown);
  document.addEventListener('keydown', onRightButtonClick);
  document.addEventListener('keydown', onLeftButtonClick);
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refs.modalWindow.classList.add('is-open');
  refs.modalImage.src = evt.target.dataset.source;
  refs.modalImage.alt = evt.target.alt;
  evt.target.parentNode.parentNode.classList.add('active');
}

function onButtonCloseClick() {
  closeModalWindow();
}

function onOverlayClick(evt) {
  if (evt.target) {
    closeModalWindow();
  }
}

function closeModalWindow() {
  refs.modalImage.src = '#';
  refs.modalImage.alt = '';
  refs.modalWindow.classList.remove('is-open');
  document.removeEventListener('keydown', onEscDown);
  document.removeEventListener('keydown', onRightButtonClick);
  document.removeEventListener('keydown', onLeftButtonClick);
}

function onEscDown(evt) {
  if (evt.code === 'Escape') {
    closeModalWindow();
  }
}

function onRightButtonClick(evt) {
  let imgIndex = galleryItems.findIndex(
    img => img.original === refs.modalImage.src,
  );
  if (evt.code === 'ArrowRight') {
    if (imgIndex === galleryItems.length - 1) {
      imgIndex -= galleryItems.length;
    }
    imgIndex += 1;
  }

  refs.modalImage.src = galleryItems[imgIndex].original;
  refs.modalImage.alt = galleryItems[imgIndex].description;
}

function onLeftButtonClick(evt) {
  let imgIndex = galleryItems.findIndex(
    img => img.original === refs.modalImage.src,
  );

  if (evt.code === 'ArrowLeft') {
    if (imgIndex === 0) {
      imgIndex += galleryItems.length;
    }
    imgIndex -= 1;
  }

  refs.modalImage.src = galleryItems[imgIndex].original;
  refs.modalImage.alt = galleryItems[imgIndex].description;
}
