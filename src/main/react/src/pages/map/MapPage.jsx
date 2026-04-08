import { useEffect, useState, useRef } from "react";
// useEffect -> 컴포넌트가 렌더링된 뒤 실행할 작업
// useRef -> 렌더링이 다시 되어도 값이 유지되는 저장소, 지도 객체나 마커 객체처럼 화면 상태가 아닌 외부 객체를 저장할 때 사용
import "../../css/map/MapPage.css";
import myLocationImg from '../../assets/my_location_marker.svg';
import safeMarkerImg from "../../assets/safe.svg";
import dangerMarkerImg from "../../assets/danger.svg";
import selectedImg from "../../assets/selected.svg"
import startMarkerImg from "../../assets/startmark.svg";
import endMarkerImg from "../../assets/endmark.svg";

export default function MapPage({
  currentLocation,
  safeMarkers,
  dangerMarkers,
  selectedPlace,
  routePath
}) {
  // Map로딩이 다 되면 마커가 찍히게끔 하기 위한 상태변수
  const [mapReady, setMapReady] = useState(false);
  // 사용할 useRef들
  const mapRef = useRef(null); // HTML div를 가리키는 ref
  const mapInstanceRef = useRef(null); // 맵 객체 자체를 저장
  const myMarkerRef = useRef(null);
  const safeMarkerRefs = useRef([]);
  const dangerMarkerRefs = useRef([]);
  const selectedMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  console.log(safeMarkerImg);
  console.log(dangerMarkerImg);

  // 1. 지도 최초 생성 ( 내 현재 위치 값으로 )
  // window.Tmapv2 -> TmapAPI 지도SDK
  useEffect(() => {
    if (!window.Tmapv2 || !mapRef.current) return;

    mapInstanceRef.current = new window.Tmapv2.Map(mapRef.current, {
      center: new window.Tmapv2.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      ),
      width: "100%",
      height: "100%",
      zoom: 16,
      zoomControl: true,
      scrollwheel: true,
    });
    setMapReady(true); // 지도 준비 완료
    return () => {
      mapInstanceRef.current?.destroy?.();
      mapInstanceRef.current = null;
    };

  }, []);

  // 2. 현재 위치가 바뀌면 지도 중심 이동 + 현재 위치 마커 갱선
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2) return;

    const center = new window.Tmapv2.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );

    // 경로가 없을 때 현재 위치로 지도 이동
    if (!routePath || routePath.length === 0) {
      mapInstanceRef.current.setCenter(center);
    }


    // 새 마커 생성 전에 기존 마커 제거
    if (myMarkerRef.current) {
      myMarkerRef.current.setMap(null);
    }
    myMarkerRef.current = new window.Tmapv2.Marker({
      position: center,
      map: mapInstanceRef.current,
      icon: myLocationImg,
      iconSize: new window.Tmapv2.Size(40, 40),
      title: "현재 위치",
    });
  }, [currentLocation.latitude, currentLocation.longitude, routePath]);

  // 3. 안전 마커 그리기
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    safeMarkerRefs.current.forEach((marker) => marker.setMap(null));
    safeMarkerRefs.current = [];

    safeMarkers.forEach((safe) => {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(safe.latitude, safe.longitude),
        map: mapInstanceRef.current,
        icon: safeMarkerImg,
        iconSize: new window.Tmapv2.Size(32, 32),
        title: safe.fac_name || safe.facType || "안전 시설",
      });

      safeMarkerRefs.current.push(marker);
    });
  }, [safeMarkers, mapReady]);

  // 4. 위험 마커 그리기
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady) return;

    dangerMarkerRefs.current.forEach((marker) => marker.setMap(null));
    dangerMarkerRefs.current = [];


    dangerMarkers.forEach((danger) => {
      const marker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(danger.latitude, danger.longitude),
        map: mapInstanceRef.current,
        icon: dangerMarkerImg,
        iconSize: new window.Tmapv2.Size(32, 32),
        title: danger.cri_road || danger.roadType || "위험 지역",
      });

      dangerMarkerRefs.current.push(marker);
    });
  }, [dangerMarkers, mapReady]);

  // 5. 선택된 장소 보여주기
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (!selectedPlace) { // 선택 안할 시 마커 지우기
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      return;
    }
    // 이미 경로가 있다면 장소 단일 마커 숨김
    if (routePath && routePath.length > 0) {
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      return;
    }

    const movePosition = new window.Tmapv2.LatLng(
      selectedPlace.lat,
      selectedPlace.lng
    );

    mapInstanceRef.current.setCenter(movePosition); // 지도를 해당 좌표로 이동
    mapInstanceRef.current.setZoom(17); // 줌 레벨 조정

    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
    }

    selectedMarkerRef.current = new window.Tmapv2.Marker({
      position: movePosition,
      map: mapInstanceRef.current,
      icon: selectedImg,
      iconSize: new window.Tmapv2.Size(32, 40),
      title: selectedPlace.name || "선택한 장소",
    });
  }, [selectedPlace, routePath]);

  // 6. 안전 경로 그리기
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2) return;

    if (routeLineRef.current) {
      routeLineRef.current.setMap(null);
      routeLineRef.current = null;
    }

    if (!routePath || routePath.length === 0) return;

    const path = routePath.map((point) =>
      new window.Tmapv2.LatLng(point.latitude, point.longitude)
    );

    routeLineRef.current = new window.Tmapv2.Polyline({
      path,
      strokeColor: "#2F80ED",
      strokeWeight: 6,
      map: mapInstanceRef.current,
    });
  }, [routePath, mapReady]);

  // 7. 출발지/목적지 마커 표시(경로 조회 후)
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2 || !mapReady) return;

    // 기존 마커 제거
    if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }
    if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
      endMarkerRef.current = null;
    }

    // 경로 없으면 출발/도착 마커 안 찍음
    if (!routePath || routePath.length === 0 || !selectedPlace) return;

    const startPosition = new window.Tmapv2.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );

    const endPosition = new window.Tmapv2.LatLng(
      selectedPlace.lat,
      selectedPlace.lng
    );

    startMarkerRef.current = new window.Tmapv2.Marker({
      position: startPosition,
      map: mapInstanceRef.current,
      icon: startMarkerImg,
      iconSize: new window.Tmapv2.Size(32, 40),
      title: "출발지",
    });

    endMarkerRef.current = new window.Tmapv2.Marker({
      position: endPosition,
      map: mapInstanceRef.current,
      icon: endMarkerImg,
      iconSize: new window.Tmapv2.Size(32, 32),
      title: selectedPlace.name || "목적지",
    });
  }, [
    routePath,
    selectedPlace,
    currentLocation.latitude,
    currentLocation.longitude,
    mapReady
  ]);

  // 8. 경로 전체가 한 눈에 보이도록 지도 범위 맞추기
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2 || !mapReady) return;
    if (!routePath || routePath.length === 0) return;

    const bounds = new window.Tmapv2.LatLngBounds();

    // 경로 전체 포함
    routePath.forEach((point) => {
      bounds.extend(
        new window.Tmapv2.LatLng(
          Number(point.latitude),
          Number(point.longitude)
        )
      );
    });

    // 출발지 포함
    bounds.extend(
      new window.Tmapv2.LatLng(
        currentLocation.latitude,
        currentLocation.longitude
      )
    );

    // 목적지 포함
    if (selectedPlace) {
      bounds.extend(
        new window.Tmapv2.LatLng(
          selectedPlace.lat,
          selectedPlace.lng
        )
      );
    }

    mapInstanceRef.current.fitBounds(bounds);
  }, [
    routePath,
    selectedPlace,
    currentLocation.latitude,
    currentLocation.longitude,
    mapReady
  ]);


  return <div ref={mapRef} className="map-container" />;
}