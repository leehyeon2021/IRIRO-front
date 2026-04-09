import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 쿠키에서 값 꺼내기
const getCookie = (name) => {
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split("=");
    if (key === name) return value;
  }

  return null;
};



// 후기 저장 API
export const saveRouteReview = async (rating) => {
  const logId = getCookie("logId");

  if (!logId) {
    throw new Error("logId 쿠키가 없습니다.");
  }

  const token = localStorage.getItem("token");

  const response = await axios.put(
    "http://localhost:8080/api/route/rating",
    {
      logId: Number(logId),
      rating: Number(rating),
    },
    {
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    }
  );

  return response.data;
};