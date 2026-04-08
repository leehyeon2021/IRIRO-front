import React, { useEffect, useState, useMemo } from 'react';

import '../../css/MainPage.css';

import iriroLogo from '../../assets/logo_iriro.png';

import MapPage from './MapPage';
import PlaceDetailCard from './PlaceDetailCard';
import SearchOverlay from '../route/SearchOverlay'

import { mapMarkerAPI } from '../../api/mapMarkAPI';

function MainPage() {
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

  const visibleSafe = useMemo(
    () => showSafeSpots ? safeMarkers : [],
    [showSafeSpots, safeMarkers]
  );

  const visibleDanger = useMemo(
    () => showDangerSpots ? dangerMarkers : [],
    [showDangerSpots, dangerMarkers]
  );


  // 현재 위치 데이터(기본값 - 테스트데이터 추후에 삭제)
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.38953,
    longitude: 126.95940,
  })

  // 위치가 바뀔 때 마다 실행
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

  const handleRouteClick = () => {
    if (!selectedPlace) return;

    // 여기에 길찾기 기능 추가

    console.log("길찾기 목적지:", selectedPlace);
    alert(`${selectedPlace.name}까지 길찾기 실행`);
  };

  return (
    <div className="app-container">
      <MapPage
        currentLocation={currentLocation}
        safeMarkers={visibleSafe}
        dangerMarkers={visibleDanger}
        selectedPlace={selectedPlace}
      />

      <div className="top-wrapper">
        <div className="search-bar"
          onClick={() => setIsSearchOpen(true)}
          style={{ cursor: 'pointer' }}>
          <span className="logo">
            <img src={iriroLogo} alt="로고" className="logo" />
          </span>
          <span className="search-text">안전 경로 탐색</span>
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-buttons">

          <button className="btn-filter btn-danger"
            onClick={() => setShowDangerSpots(!showDangerSpots)}>
            ⚠️ 위험 구역
          </button>

          <button className="btn-filter btn-safe"
            onClick={() => setShowSafeSpots(!showSafeSpots)}>
            ✅ 안전 구역
          </button>
        </div>
      </div>

      {!selectedPlace && (
        <div className="bottom-wrapper">
          <div style={{ position: 'relative' }}>
            {isMenuOpen && (
              <div className="menu-popup">
                <button
                  className="btn-menu-item"
                  onClick={() => {
                    // 나중에 여기에 진짜 커뮤니티 페이지로 넘어가는 코드를 넣으면 됩니다!
                    alert("커뮤니티 페이지로 이동합니다! 📢");
                    setIsMenuOpen(false); // 클릭 후에는 메뉴 다시 닫아주기
                  }}
                >
                  📢
                </button>
              </div>
            )}

            <button className="btn-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
              <div className="menu-bar"></div>
            </button>
          </div>


          <button className="btn-menu btn-report" onClick={() => setIsModalOpen(true)}>
            <span>🚨</span>
            <span>신고</span>
          </button>
        </div>
      )}


      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">🚨 긴급 신고</h2>
            <p className="modal-text">현재 위치를 기반으로<br />경찰에 긴급 신고하시겠습니까?</p>
            <div className="modal-buttons">
              <button className="btn-modal btn-cancel" onClick={() => setIsModalOpen(false)}>취소</button>
              <button className="btn-modal btn-confirm" onClick={() => {
                alert("신고가 접수되었습니다!");
                setIsModalOpen(false);
              }}>신고하기</button>
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <SearchOverlay
          onClose={() => setIsSearchOpen(false)}
          onSelectPlace={(place) => {
            setSelectedPlace(place);
            setIsSearchOpen(false); // 선택하면 검색창 닫기
          }}
        />
      )}

      {selectedPlace && (
        <PlaceDetailCard
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
          onRouteClick={handleRouteClick} // 길찾기를 눌렀는지!
        />
      )}
    </div>
  );
}

export default MainPage;