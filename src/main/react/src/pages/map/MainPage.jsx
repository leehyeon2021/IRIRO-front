import React, { useEffect, useState, useMemo } from 'react';

import '../../css/MainPage.css';

import MainHeader from '../../components/layout/MainHeader';
import MapPage from './MapPage';
import PlaceDetailCard from './PlaceDetailCard';
import SearchOverlay from '../route/SearchOverlay'
import { useNavigate } from 'react-router-dom';
import { mapMarkerAPI } from '../../api/mapMarkAPI';
import { getSafeRoute } from '../../api/safeRouteAPI';
import useArrivalReview from '../../utils/useArrivalReview';
import RouteReviewModal from '../route/RouteReviewModal';
import { deleteCookie, setCookie } from '../../utils/cookie';

export default function MainPage() {

  const navigate = useNavigate();

  const [showDangerSpots, setShowDangerSpots] = useState(false);
  const [showSafeSpots, setShowSafeSpots] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // ⭐ 1단계: 왼쪽 아래 메뉴를 열고 닫을 스위치 추가!
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 검색창 상태변화
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // 안전, 위험 마커 상태 관리
  const [safeMarkers, setSafeMarkers] = useState([]);
  const [dangerMarkers, setDangerMarkers] = useState([]);

  // 검색창에서 장소를 선택했는 지 상태관리
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 안전 경로 상태
  const [routePath, setRoutePath] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  const visibleSafe = useMemo(
    () => showSafeSpots ? safeMarkers : [],
    [showSafeSpots, safeMarkers]
  );

  const visibleDanger = useMemo(
    () => showDangerSpots ? dangerMarkers : [],
    [showDangerSpots, dangerMarkers]
  );

  // 현재 위치 데이터
  const [currentLocation, setCurrentLocation] = useState({
    // latitude: 37.382902409385046,
    // longitude: 126.93171060773527
    latitude: 37.4999379,
    longitude: 126.9202991
  });

  const { showReview, setShowReview, resetArrivalReview } = useArrivalReview({ currentLocation, selectedPlace, routePath });


  // 현재 위치 가져오기
  useEffect(() => {
    // if (!navigator.geolocation) {
    //   console.log("Geolocation 지원 안됨");
    //   return;
    // }

    // // 초기 로딩
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const { latitude, longitude } = position.coords;
    //     setCurrentLocation({ latitude, longitude });
    //     console.log("초기 위치 로드 완료:", latitude, longitude);
    //   },
    //   (error) => {
    //     console.log("초기 위치 조회 실패:", error);
    //   },
    //   { enableHighAccuracy: true }
    // );

    // // 변경 될 때 마다 조회 실행
    // const watchId = navigator.geolocation.watchPosition(
    //   (position) => {
    //     setCurrentLocation({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
    //     });
    //   },
    //   (error) => {
    //     console.log("현재 위치 조회 실패:", error);
    //   },
    //   {
    //     enableHighAccuracy: true,
    //     timeout: 10000,
    //     maximumAge: 5000,
    //   }
    // );
    // return () => {
    //   navigator.geolocation.clearWatch(watchId);
    // };
  }, []);

  // 주변 마커 조회
  useEffect(() => {
    fetchMarkers();
  }, [currentLocation.latitude, currentLocation.longitude])
  // 원시값 비교로 변경 → 실제 값이 바뀔 때만 실행

  // 마커 가져오기
  const fetchMarkers = async () => {
    try {
      const { safeMarkers, dangerMarkers } = await mapMarkerAPI(currentLocation);

      setSafeMarkers(safeMarkers);
      setDangerMarkers(dangerMarkers);
    } catch (error) {
      console.log('마커 조회 실패:', error);
    }
  }

  // 안전 경로 호출
  const handleRouteClick = async () => {
    if (!selectedPlace) return;

    try {
      const response = await getSafeRoute({
        startLat: currentLocation.latitude,
        startLng: currentLocation.longitude,
        endLat: selectedPlace.lat,
        endLng: selectedPlace.lng,
      });

      const selectedRoute = response.selectedRoute;
      const logId = response.logId;

      if (logId) {
        setCookie("logId", logId)
      }

      resetArrivalReview();

      setRoutePath(selectedRoute?.routePoints || []);
      setRouteInfo({
        totalTime: selectedRoute?.totalTime ?? 0,
        totalDistance: selectedRoute?.totalDistance ?? 0,
      });
    } catch (error) {
      alert("안전 경로 조회에 실패했습니다.");
    }
  };

  // 112
  const callPolice = () => {
    let phoneNumber = '이곳에전화번호넣기';
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="app-container">
      <div className='map-shell'>
        <MainHeader />
        <MapPage
          currentLocation={currentLocation}
          safeMarkers={visibleSafe}
          dangerMarkers={visibleDanger}
          selectedPlace={selectedPlace}
          routePath={routePath}
        />

        <div className="top-wrapper">
          <div
            className="search-bar"
            onClick={() => setIsSearchOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <span className="search-text">안전 경로 탐색</span>
            <span className="search-icon">🔍</span>
          </div>

          <div className="filter-buttons">
            <button
              className="btn-filter btn-danger"
              onClick={() => setShowDangerSpots(!showDangerSpots)}
            >
              ⚠️ 위험 구역
            </button>

            <button
              className="btn-filter btn-safe"
              onClick={() => setShowSafeSpots(!showSafeSpots)}
            >
              ✅ 안전 구역
            </button>
          </div>
        </div>

        {!selectedPlace && (
          <div className="bottom-wrapper">
            <div style={{ position: "relative" }}>
              {isMenuOpen && (
                <div className="menu-popup">
                  <button
                    className="btn-menu-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/articles");
                    }}
                  >
                    📰
                  </button>

                  <button
                    className="btn-menu-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate("/community");
                    }}
                  >
                    📢
                  </button>
                </div>
              )}

              <button
                className="btn-menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
                <div className="menu-bar"></div>
              </button>
            </div>

            <button
              className="btn-menu btn-report"
              onClick={() => setIsModalOpen(true)}
            >
              <span>🚨</span>
              <span>신고</span>
            </button>
          </div>
        )}
      </div>

      {showReview && (
        <RouteReviewModal
          onClose={() => setShowReview(false)}
          onSuccess={() => {
            deleteCookie("logId");
            resetArrivalReview();
            setSelectedPlace(null);
            setRoutePath([]);
            setRouteInfo(null);
          }}
        />
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">🚨 긴급 신고</h2>
            <p className="modal-text">
              현재 위치를 기반으로
              <br />
              경찰에 긴급 신고하시겠습니까?
            </p>
            <div className="modal-buttons">
              <button
                className="btn-modal btn-cancel"
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
              <button
                className="btn-modal btn-confirm"
                onClick={() => {
                  callPolice();
                  alert('전화 앱으로 이동합니다.');
                  setIsModalOpen(false);
                }}
              >
                신고하기
              </button>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOpen(false)}
          onSelectPlace={(place) => {
            deleteCookie("logId");
            resetArrivalReview();
            setSelectedPlace(place);
            setRoutePath([]);
            setRouteInfo(null);
            setIsSearchOpen(false);
          }}
        />
      )}

      {selectedPlace && (
        <PlaceDetailCard
          place={selectedPlace}
          onClose={() => {
            deleteCookie("logId");
            resetArrivalReview();
            setSelectedPlace(null);
            setRoutePath([]);
            setRouteInfo(null);
          }}
          onRouteClick={handleRouteClick}
          routeInfo={routeInfo}
        />
      )}
    </div>
  );
}