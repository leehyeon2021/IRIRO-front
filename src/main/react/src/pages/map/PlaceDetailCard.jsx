import "../../css/map/PlaceDetailCard.css";

export default function PlaceDetailCard({ place, onClose, onRouteClick }) {
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

      <div className="place-card-actions">
        <button className="place-route-btn" onClick={onRouteClick}>
          길찾기
        </button>
      </div>
    </div>
  );
}