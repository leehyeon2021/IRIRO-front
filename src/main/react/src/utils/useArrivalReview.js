import { useEffect, useState } from "react";

// 위도,경도를 감안한 거리 계산 함수
const getDistanceFromLatLonInMeter = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// 후기
export default function useArrivalReview({
  currentLocation,
  selectedPlace,
  routePath,
  arriveDistance = 50,
}) {
  const [hasArrived, setHasArrived] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    if (!selectedPlace || routePath.length === 0) return;
    if (hasArrived) return;

    const distance = getDistanceFromLatLonInMeter(
      currentLocation.latitude,
      currentLocation.longitude,
      selectedPlace.lat,
      selectedPlace.lng
    );

    if (distance <= arriveDistance) {
      setHasArrived(true);
      setShowReviewModal(true);
    }
  }, [currentLocation, selectedPlace, routePath, hasArrived, arriveDistance]);

  // 후기 리셋 함수
  const resetArrivalReview = () => {
    setHasArrived(false);
    setShowReviewModal(false);
  };

  return {
    hasArrived,
    showReview,
    setShowReview,
    resetArrivalReview,
  };
}