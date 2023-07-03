import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const list = document.querySelector('.gallery');

function createMarkupItems(arr) {
	return arr
		.map(
			({ preview, original, description }) =>
				`<li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img class="gallery__image" src="${preview}" alt="${description}" />
                    </a>
                </li>`
		)
		.join('');
}
list.insertAdjacentHTML('beforeend', createMarkupItems(galleryItems));

new SimpleLightbox('.gallery a', {
	captionsData: 'alt',
	captionDelay: 250,
});
