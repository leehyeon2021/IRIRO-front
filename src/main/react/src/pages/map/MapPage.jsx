import { useEffect, useState, useRef } from "react";
import Supercluster from 'supercluster';
import "../../css/map/MapPage.css";
import myLocationImg from '../../assets/my_location_marker.svg';
import safeMarkerImg from "../../assets/safe.svg";
import dangerMarkerImg from "../../assets/danger.svg";
import selectedImg from "../../assets/selected.svg";
import startMarkerImg from "../../assets/startmark.svg";
import endMarkerImg from "../../assets/endmark.svg";

export default function MapPage({
  currentLocation,
  safeMarkers,
  dangerMarkers,
  selectedPlace,
  routePath,
  routeStartLocation
}) {
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const myMarkerRef = useRef(null);
  
  const safeMarkerRefs = useRef([]);
  const dangerClusterMarkersRef = useRef([]);
  const superclusterRef = useRef(null);

  const selectedMarkerRef = useRef(null);
  const routeLineRef = useRef(null);
  const startMarkerRef = useRef(null);
  const endMarkerRef = useRef(null);

  // fitBounds 1회용 플래그
  const hasFittedRouteRef = useRef(false);

  // 1. 지도 최초 생성
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
    setMapReady(true);

    return () => {
      mapInstanceRef.current?.destroy?.();
      mapInstanceRef.current = null;
    };
  }, []);

  // 2. 현재 위치 마커
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2) return;

    const center = new window.Tmapv2.LatLng(
      currentLocation.latitude,
      currentLocation.longitude
    );

    if (!routePath || routePath.length === 0) {
      mapInstanceRef.current.setCenter(center);
    }

    if (myMarkerRef.current) {
      myMarkerRef.current.setPosition(center);
      return;
    }
    myMarkerRef.current = new window.Tmapv2.Marker({
      position: center,
      map: mapInstanceRef.current,
      icon: myLocationImg,
      iconSize: new window.Tmapv2.Size(40, 40),
      title: "현재 위치",
    });
  }, [currentLocation.latitude, currentLocation.longitude, routePath]);

  // 3. 안전 마커
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
        title: safe.fac_name + "(" + safe.facType + ")" || "안전 시설",
      });
      safeMarkerRefs.current.push(marker);
    });
  }, [safeMarkers, mapReady]);

  // 4. 위험 마커 supercluster 클러스터링
  useEffect(() => {
    if (!mapInstanceRef.current || !mapReady || !window.Tmapv2) return;

    // 마커 없으면 기존 것만 정리
    if (!dangerMarkers || dangerMarkers.length === 0) {
      dangerClusterMarkersRef.current.forEach((m) => m.setMap(null));
      dangerClusterMarkersRef.current = [];
      return;
    }

    // GeoJSON 포인트 변환 (좌표 없으면 제외 — 클러스터/Tmap 내부 null 참조 방지)
    const points = dangerMarkers
      .filter(
        (danger) =>
          Number.isFinite(Number(danger.latitude)) &&
          Number.isFinite(Number(danger.longitude))
      )
      .map((danger) => ({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [Number(danger.longitude), Number(danger.latitude)],
        },
        properties: {
          title: danger.cri_road || danger.roadType || "위험 지역",
        },
      }));

    // supercluster 로드
    superclusterRef.current = new Supercluster({ radius: 60, maxZoom: 18 });
    superclusterRef.current.load(points);

    const drawClusters = () => {
      if (!mapInstanceRef.current || !superclusterRef.current) return;

      dangerClusterMarkersRef.current.forEach((m) => m.setMap(null));
      dangerClusterMarkersRef.current = [];

      const map = mapInstanceRef.current;
      let zoom;
      try {
        zoom = Math.floor(map.getZoom());
      } catch {
        return;
      }
      const bounds = map.getBounds?.();
      if (!bounds) return;
      const sw = bounds.getSouthWest?.();
      const ne = bounds.getNorthEast?.();
      if (!sw || !ne || typeof sw.lng !== "function" || typeof ne.lng !== "function") {
        return;
      }

      const clusters = superclusterRef.current.getClusters(
        [sw.lng(), sw.lat(), ne.lng(), ne.lat()],
        zoom
      );

      clusters.forEach((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count } = cluster.properties;

        if (isCluster) {
          const clusterMarker = new window.Tmapv2.InfoWindow({
            position: new window.Tmapv2.LatLng(lat, lng),
            map,
            content: `
              <div style="
                background: rgba(210,40,40,0.92);
                color: white;
                border-radius: 50%;
                width: 46px;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: bold;
                border: 2.5px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.35);
                cursor: pointer;
              ">${point_count}</div>
            `,
            type: 2,
            border: '0px',
            background: 'transparent',
          });
          dangerClusterMarkersRef.current.push(clusterMarker);
        } else {
          const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(lat, lng),
            map,
            icon: dangerMarkerImg,
            iconSize: new window.Tmapv2.Size(32, 32),
            title: cluster.properties.title,
          });
          dangerClusterMarkersRef.current.push(marker);
        }
      });
    };

    drawClusters();

    const map = mapInstanceRef.current;
    map.addListener('zoom_changed', drawClusters);
    map.addListener('dragend', drawClusters);

    return () => {
      map.removeListener('zoom_changed', drawClusters);
      map.removeListener('dragend', drawClusters);
      dangerClusterMarkersRef.current.forEach((m) => m.setMap(null));
      dangerClusterMarkersRef.current = [];
    };
  }, [dangerMarkers, mapReady]);

  // 5. 선택된 장소 마커
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (!selectedPlace) {
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      return;
    }

    if (routePath && routePath.length > 0) {
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.setMap(null);
        selectedMarkerRef.current = null;
      }
      return;
    }

    const movePosition = new window.Tmapv2.LatLng(selectedPlace.lat, selectedPlace.lng);
    mapInstanceRef.current.setCenter(movePosition);
    mapInstanceRef.current.setZoom(17);

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

  // 6. 경로 그리기
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
      strokeColor: "#f52a2a",
      strokeWeight: 6,
      map: mapInstanceRef.current,
    });
  }, [routePath, mapReady]);

  // 7. 출발지/목적지 마커
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2 || !mapReady) return;

    if (startMarkerRef.current) {
      startMarkerRef.current.setMap(null);
      startMarkerRef.current = null;
    }
    if (endMarkerRef.current) {
      endMarkerRef.current.setMap(null);
      endMarkerRef.current = null;
    }

    const startLat = routeStartLocation?.latitude ?? currentLocation.latitude;
    const startLng = routeStartLocation?.longitude ?? currentLocation.longitude;

    if (!routePath || routePath.length === 0 || !selectedPlace) return;

    startMarkerRef.current = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(startLat, startLng),
      map: mapInstanceRef.current,
      icon: startMarkerImg,
      iconSize: new window.Tmapv2.Size(32, 40),
      title: "출발지",
    });

    endMarkerRef.current = new window.Tmapv2.Marker({
      position: new window.Tmapv2.LatLng(selectedPlace.lat, selectedPlace.lng),
      map: mapInstanceRef.current,
      icon: endMarkerImg,
      iconSize: new window.Tmapv2.Size(32, 32),
      title: selectedPlace.name || "목적지",
    });
  }, [routePath, selectedPlace, routeStartLocation, mapReady]);

  // 새 경로가 들어오면 fitBounds를 다시 허용
  useEffect(() => {
    if (!routePath || routePath.length === 0) {
      hasFittedRouteRef.current = false;
      return;
    }

    hasFittedRouteRef.current = false;
  }, [routePath]);

  // 8. 경로 fitBounds
  useEffect(() => {
    if (!mapInstanceRef.current || !window.Tmapv2 || !mapReady) return;
    if (!routePath || routePath.length === 0) return;

    if (hasFittedRouteRef.current) return;

    const bounds = new window.Tmapv2.LatLngBounds();

    routePath.forEach((point) => {
      bounds.extend(new window.Tmapv2.LatLng(Number(point.latitude), Number(point.longitude)));
    });

    // 현재 위치 대신 고정 출발지를 bounds에 포함
    if (routeStartLocation) {
      bounds.extend(
        new window.Tmapv2.LatLng(
          routeStartLocation.latitude,
          routeStartLocation.longitude
        )
      );
    }

    if (selectedPlace) {
      bounds.extend(new window.Tmapv2.LatLng(selectedPlace.lat, selectedPlace.lng));
    }

    mapInstanceRef.current.fitBounds(bounds);
    hasFittedRouteRef.current = true; // 이후 현재 위치가 바뀌어도 다시 fitBounds 안 하게 막기
  }, [routePath, selectedPlace, routeStartLocation, mapReady]);

  return <div ref={mapRef} className="map-container" />;
}