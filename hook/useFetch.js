import { useState } from "react";
import axios from 'axios';

// Creating API's for retrieving Job data
import { RAPID_API_KEY} from '@env'
const API = RAPID_API_KEY

const useFetch = ( endpoint ) => {
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const axios = require('axios');

    const options =  {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
        query: 'Python developer in Texas, USA',
        page: '1',
        num_pages: '1'
    },
    headers: {
        'X-RapidAPI-Key': '9041e43253mshdb27677bb91205cp1fa48cjsn6ff94fd83efc',
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }


}

