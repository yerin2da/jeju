import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useMap, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import Circle from './Circle'; // ✅ 원 그리는 컴포넌트 가져오기

const PoiMarkers = ({ pois }) => {
    const map = useMap();
    const [markers, setMarkers] = useState({});
    const [circleCenter, setCircleCenter] = useState(null); // ✅ 원 중심

    const clusterer = useRef(null);

    // 마커 클릭 시 지도 이동 + 원 중심 설정
    const handleClick = useCallback((ev) => {
        if (!map || !ev.latLng) return;
        map.panTo(ev.latLng);
        setCircleCenter(ev.latLng); // ✅ 클릭된 위치에 원 표시
    }, [map]);

    useEffect(() => {
        if (!map || clusterer.current) return;
        clusterer.current = new MarkerClusterer({ map });
    }, [map]);

    useEffect(() => {
        if (!clusterer.current) return;
        clusterer.current.clearMarkers();
        clusterer.current.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker, key) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            const updated = { ...prev };
            if (marker) {
                updated[key] = marker;
            } else {
                delete updated[key];
            }
            return updated;
        });
    };

    return (
        <>
            {/* ✅ 반경 원 표시 */}
            {circleCenter && (
                <Circle
                    center={circleCenter}
                    radius={800}
                    strokeColor={'#0c4cb3'}
                    strokeOpacity={1}
                    strokeWeight={3}
                    fillColor={'#3b82f6'}
                    fillOpacity={0.3}
                />
            )}

            {pois.map((poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    ref={(marker) => setMarkerRef(marker, poi.key)}
                    clickable={true}
                    onClick={handleClick}
                >
                    <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default PoiMarkers;
