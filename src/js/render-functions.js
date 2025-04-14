import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;

const loader = document.querySelector('.container-form span');
const loadMoreButton = document.querySelector('.btn-load-more');


export function createGallery(images) {
    const galleryContainer = document.querySelector('.gallery');
    const gallery = images.map(image => {
        return `<li class="gallery-item">
                    <a class="large-image" href="${image.largeImageURL}">
                        <img
                        src="${image.webformatURL}"
                        alt="${image.tags}"
                        class="gallery-image"
                        loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b><br>${image.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b><br>${image.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b><br>${image.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b><br>${image.downloads}
                        </p>
                    </div>
                </li>`;
    }).join('');

    galleryContainer.insertAdjacentHTML('beforeend', gallery);

    if (lightbox) {
        lightbox.refresh();
    } else {
        lightbox = new SimpleLightbox('.gallery a', {
            captionsData: 'alt',
            captionDelay: 250,
            captionClass: "caption",
            scrollZoom: false,
        });
    }
}

export function clearGallery() {
    const galleryContainer = document.querySelector('.gallery');
    if (!galleryContainer.innerHTML) {
        return;
    } else {
        galleryContainer.innerHTML = '';
        if (lightbox) {
            lightbox.refresh();
        }
    }
}

export function showLoader() {
    loader.id = 'loader';
}

export function hideLoader() {
    loader.id = '';
}

export function showLoadMoreButton() {
    loadMoreButton.classList.remove('visually-hidden');
}

export function hideLoadMoreButton() {
    loadMoreButton.classList.add('visually-hidden');
}


