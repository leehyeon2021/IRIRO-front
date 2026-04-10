import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 안전 경로 반환 함수 response 응답에는 안전점수, 출발지, 목적지 위도 경도, 경로 위도,경도가 있다.
export const getSafeRoute = async ({ startLat, startLng, endLat, endLng }) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_BASE_URL}/api/saferoute`, {
    startLat,
    startLng,
    endLat,
    endLng,
  },
  {
    headers: token ? { Authorization: `Bearer ${token}` } : []
  }
);

  return response.data;
};