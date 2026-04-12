import "../../css/map/PlaceDetailCard.css";

export default function PlaceDetailCard({ place, onClose, onRouteClick, routeInfo }) {
  return (
    <div className="place-card">
      <div className="place-card-handle"></div>

      <div className="place-card-header">
        <div className="place-card-info">
          <h3 className="place-card-title">{place.name}</h3>
          <p className="place-card-address">{place.address || place.roadAddress || "주소 정보 없음"}</p>
        </div>

        <button className="place-card-close" onClick={onClose}>
          ✕
        </button>
      </div>

      {routeInfo ? (
        <div className="place-card-route-info">
          <p>총 시간: {Math.ceil(routeInfo.totalTime / 60)}분</p>
          <p>총 거리: {routeInfo.totalDistance}m</p>
          <p>안전점수: {routeInfo.safetyScore}점</p>
        </div>
      ) : (
        <div className="place-card-actions">
          <button className="place-route-btn" onClick={onRouteClick}>
            길찾기
          </button>
        </div>
      )}
    </div>
  );
}