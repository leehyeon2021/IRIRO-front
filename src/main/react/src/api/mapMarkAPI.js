import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSafeMarkers = async ({ latitude, longitude }) => {
    const resposne = await axios.get(`${API_BASE_URL}/api/map/marker/safe`, {
        params: { latitude, longitude },
    });
    return resposne.data;
}

export const getDangerMarkers = async ({latitude, longitude}) => {
    const resposne = await axios.get(`${API_BASE_URL}/api/map/marker/danger`, {
        params: { latitude, longitude },
    });
    return resposne.data;
}

export const mapMarkerAPI = async ({ latitude, longitude }) => {
    const safeMarkers = await getSafeMarkers({latitude, longitude});
    const dangerMarkers = await getDangerMarkers({latitude, longitude});

    return{
        safeMarkers,
        dangerMarkers,
    };
}