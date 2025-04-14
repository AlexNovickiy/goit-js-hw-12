import axios from 'axios';

const limit = 15;

export async function getImagesByQuery(query, page) {
    const dataQuery = await axios.get('https://pixabay.com/api/', {
        params: {
            key: "49710330-98dfa6cd438c2509062a34f3f",
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: limit,
            page: page,
        }
    });
    return dataQuery.data;
}