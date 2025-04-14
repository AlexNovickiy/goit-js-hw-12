import {getImagesByQuery} from './js/pixabay-api';
import * as render from './js/render-functions';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import brick from "./img/brick.svg";

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loadMoreButton = document.querySelector('.btn-load-more');

let query;
let page = 1;
let totalPages;

form.addEventListener('submit', async event => {
    event.preventDefault();
    render.clearGallery();
    query = input.value.trim();
    if (!query) {
        iziToast.error({
            title: '',
            iconUrl: brick,
            message: 'Field cannot be empty. Please, try again!',
            position: 'topRight',
            backgroundColor: '#ef4040',
            messageColor: 'white',
            titleColor: 'white',
            timeout: 4000,
            maxWidth: 380,
        });
        return;
    } else {
        page = 1;
        render.hideLoadMoreButton();
        render.showLoader();
        try {
            const dataQuery = await getImagesByQuery(query, page);
        if (dataQuery.hits.length === 0) {
                iziToast.error({
                    title: '',
                    iconUrl: brick,
                    message: 'Sorry, there are no images matching your search query. Please, try again!',
                    position: 'topRight',
                    backgroundColor: '#ef4040',
                    messageColor: 'white',
                    titleColor: 'white',
                    timeout: 4000,
                    maxWidth: 380,
                });
            } else {
                render.createGallery(dataQuery.hits);
                form.reset();
                page += 1;
                totalPages = Math.ceil(dataQuery.totalHits / 15);
                if (page > totalPages) {
                    iziToast.info({
                        title: '',
                        iconUrl: brick,
                        message: 'We`re sorry, but you`ve reached the end of search results.',
                        position: 'topRight',
                        backgroundColor: '#ef4040',
                        messageColor: 'white',
                        titleColor: 'white',
                        timeout: 4000,
                        maxWidth: 380,
                    });
                } else {
                    render.showLoadMoreButton();
                }
            }
            render.hideLoader();
        } catch (error) {
            console.error('Error fetching images:', error);
            iziToast.error({
                title: '',
                iconUrl: brick,
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: 'white',
                titleColor: 'white',
                timeout: 4000,
                maxWidth: 380,
            });
        }
        
    }
});

loadMoreButton.addEventListener('click', async () => {
    render.showLoader();
    try {
        const dataQuery = await getImagesByQuery(query, page);
        render.createGallery(dataQuery.hits);

        const cardHeight = document.querySelector('.gallery-item').getBoundingClientRect().height;
                window.scrollBy({
                    top: cardHeight * 2,
                    behavior: "smooth",
                });
            page += 1;
            if (page > totalPages) {
            iziToast.info({
                title: '',
                iconUrl: brick,
                message: 'We`re sorry, but you`ve reached the end of search results.',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: 'white',
                titleColor: 'white',
                timeout: 4000,
                maxWidth: 380,
        });
                render.hideLoadMoreButton();
            }
        render.hideLoader();
    } catch (error) { 
        console.error('Error fetching images:', error);
            iziToast.error({
                title: '',
                iconUrl: brick,
                message: 'An error occurred while fetching images. Please try again later.',
                position: 'topRight',
                backgroundColor: '#ef4040',
                messageColor: 'white',
                titleColor: 'white',
                timeout: 4000,
                maxWidth: 380,
            });
    }
});

