// 지도 단어 입력시 목록이 나오는 API를 사용할 곳
import axios from 'axios';

// 🔍 Tmap POI 검색 API 호출 함수
export const searchTmapPOI = async (keyword) => {
    try {
        const response = await 
        axios.get("https://apis.openapi.sk.com/tmap/pois", {
            params: {
                version: 1,
                searchKeyword: keyword,
                format: "json",
                count: 15,
                sort: "score",
            },
            headers: {
                appKey: import.meta.env.VITE_TMAP_JS_KEY,
            },
        });
        const poiData = response.data?.searchPoiInfo?.pois?.poi;
        if(poiData) return poiData;
        else return [];

    } catch (error) {
        console.error("Tmap POI API 호출 중 에러 발생:", error);
        throw error;
    }
};