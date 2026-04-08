import { useEffect, useState, useRef } from "react";
// useEffect -> 컴포넌트가 렌더링된 뒤 실행할 작업
// useRef -> 렌더링이 다시 되어도 값이 유지되는 저장소, 지도 객체나 마커 객체처럼 화면 상태가 아닌 외부 객체를 저장할 때 사용
import "../../css/map/MapPage.css";
import myLocationImg from '../../assets/my_location_marker.svg';
import safeMarkerImg from "../../assets/safe.svg";
import dangerMarkerImg from "../../assets/danger.svg";
import selectedImg from "../../assets/selected.svg"

export default function MapPage({ currentLocation, safeMarkers, dangerMarkers, selectedPlace }) {
  // Map로딩이 다 되면 마커가 찍히게끔 하기 위한 상태변수
  const [mapReady, setMapReady] = useState(false);
  // 사용할 useRef들
  const mapRef = useRef(null); // HTML div를 가리키는 ref
  const mapInstanceRef = useRef(null); // 맵 객체 자체를 저장
  const myMarkerRef = useRef(null);
  const safeMarkerRefs = useRef([]);
  const dangerMarkerRefs = useRef([]);
  const selectedMarkerRef = useRef(null);

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

    mapInstanceRef.current.setCenter(center);

    // 새 마커 생성 전에 기존 마커 제거
    if(myMarkerRef.current){
      myMarkerRef.current.setMap(null);
    }
    myMarkerRef.current = new window.Tmapv2.Marker({
      position: center,
      map: mapInstanceRef.current,
      icon: myLocationImg,
      iconSize: new window.Tmapv2.Size(40, 40),
      title: "현재 위치",
    });
  }, [currentLocation.latitude, currentLocation.longitude]);

  // 3. 안전 마커 그리기
    useEffect(() => {
      if( !mapInstanceRef.current || !mapReady) return;

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
    if(!mapInstanceRef.current) return ;
    if(!selectedPlace){ // 선택 안할 시 마커 지우기
      if(selectedMarkerRef.current){
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      return ;
    }

    const movePosition = new window.Tmapv2.LatLng(
      selectedPlace.lat,
      selectedPlace.lng
    );

    mapInstanceRef.current.setCenter(movePosition); // 지도를 해당 좌표로 이동
    mapInstanceRef.current.setZoom(17); // 줌 레벨 조정

    if(selectedMarkerRef.current){
      selectedMarkerRef.current.setMap(null);
    }

    selectedMarkerRef.current = new window.Tmapv2.Marker({
      position: movePosition,
      map: mapInstanceRef.current,
      icon: selectedImg,
      iconSize: new window.Tmapv2.Size(32, 40),
      title: selectedPlace.name || "선택한 장소",
    });
  }, [selectedPlace]);


  return <div ref={mapRef} className="map-container" />;
}