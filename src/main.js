import {getImagesByQuery} from './js/pixabay-api';
import * as render from './js/render-functions';

import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";

import brick from "./img/brick.svg";

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');

form.addEventListener('submit', event => {
    event.preventDefault();
    render.clearGallery();
    const query = input.value.trim();
    if (!query) {
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
        return;
    } else {
        render.showLoader();
        getImagesByQuery(query)
        .then(response => { 
            if (response.data.hits.length === 0) {
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
                render.createGallery(response.data.hits);
                form.reset();
            }
        })
        .catch(error => {
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
        })
        .finally(() => {
            render.hideLoader();
        })
    }
});