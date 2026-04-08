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

        // 티맵 응답 구조에서 실제 장소 배열(poi)만 쏙 뽑아냅니다.
        const poiData = response.data?.searchPoiInfo?.pois?.poi;

        // 검색 결과가 있으면 배열을, 없으면 빈 배열을 반환
        return poiData.map((poi) => ({
            id: poi.id, // poi.id 저장 추후에 상세조회용
            name: poi.name, // 장소명
            address: poi.upperAddrName && poi.middleAddrName && poi.lowerAddrName
                ? `${poi.upperAddrName} ${poi.middleAddrName} ${poi.lowerAddrName}`
                : poi.upperAddrName || "", // 주소 ( 시/도, 구/군, 동)
            lat: Number(poi.frontLat || poi.noorLat || 0), // 입구 좌표가 있다면 선택 없다면 중심 좌표 없다면 0
            lng: Number(poi.frontLon || poi.noorLon || 0),
            category: poi.category,
            raw: poi, // 원본 보관용
        }));
    } catch (error) {
        console.error("Tmap POI API 호출 중 에러 발생:", error);
        throw error;
    }
};