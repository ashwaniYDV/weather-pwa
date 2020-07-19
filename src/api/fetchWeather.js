import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f33a484cf794d08d0148764789aaba32';

export const fetchWeather = async (query) => {
    try {
        const { data } = await axios.get(URL, {
            params: {
                q: query,
                units: 'metric',
                APPID: API_KEY,
            }
        });
        return {
            status: "success",
            data
        };
    } catch(err) {
        console.log(err.response.data.message)
        if (err.response && err.response.data && err.response.data.message) {
            let msg = err.response.data.message;
            msg = msg.charAt(0).toUpperCase() + msg.substring(1) + '!';
            return {
                status: "error",
                data: msg
            }
        } else {
            return {
                status: "error",
                data: "Some erroe occurred!"
            }
        }
    }
}