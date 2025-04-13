import axios from 'axios';

export function getImagesByQuery(query) {
    return axios.get('https://pixabay.com/api/', {
        params: {
            key: "49710330-98dfa6cd438c2509062a34f3f",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
        }
    });
}