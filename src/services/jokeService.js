import axios from 'axios';

const BASE_URL = "https://jokebook.link/api/v1/jokes";

export const fetchJokes = async () => {
    const config = {
        method: "GET",
        url: BASE_URL,
        headers: {
            'Access-Control-Allow-Origin': 'https://www.jokebook.uk/'
        }
    }
    const { data } = await axios(config);
    return data;
}

export const addJoke = async joke => {
    const config = {
        method: "POST",
        url: BASE_URL,
        data: joke,
        headers: {
            'Access-Control-Allow-Origin': 'https://www.jokebook.uk/'
        }
    }
    const { data } = await axios(config);
    return data;
}

export const deleteJoke = async id => {
    const config = {
        method: "DELETE",
        url: `${BASE_URL}/${id}`,
        data: id,
        headers: {
            'Access-Control-Allow-Origin': 'https://www.jokebook.uk/'
        }
    }
    await axios(config);
}

