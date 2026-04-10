import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 후기 저장 API
export const saveRouteReview = async (rating) => {  
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_BASE_URL}/api/saverating`,
    {
      rating: Number(rating),
    },
    {
      withCredentials: true,
      headers: token
        ? { Authorization: `Bearer ${token}` }
        : {},
    }
  );

  return response.data;
};