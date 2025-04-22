import React, { useState, useCallback } from 'react';
import { Map, Marker, useMap } from '@vis.gl/react-google-maps';

import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {detailAddressAtom, locaAddressAtom, locationAtom, clickedLatLngAtom } from "../recoil/atoms";
import SearchInput from "./SearchInput";

export default function CustomMap() {
    const setLocation = useSetRecoilState(locationAtom);//거래장소 좌표값
    const setLocaAddress = useSetRecoilState(locaAddressAtom);//거래장소 주소
    const locaAddress = useRecoilValue(locaAddressAtom);//장소선택 주소

    const detailAddress = useRecoilValue(detailAddressAtom); // 거래장소
    const setDetailAddress = useSetRecoilState(detailAddressAtom);// 거래장소

    const [clickedLatLng, setClickedLatLng] = useRecoilState(clickedLatLngAtom);// 마커표시
    const [inputAddress, setInputAddress] = useState('');//검색창에 입력한 주소 문자열
    const map = useMap(); // 지도 인스턴스 접근용


    // 지도 클릭 시 마커 생성
    const handleMapClick = useCallback((event) => {
        const latLng = event.detail.latLng;
        if (!latLng) return;

        setLocation(latLng); // 위치 저장
        setClickedLatLng(latLng);// 마커 위치

        console.log(latLng);

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const address = results[0].formatted_address;
                setLocaAddress(address);
            } else {
                console.log("주소 변환 실패", status);
            }
        });
    }, [setLocation, setLocaAddress]);


    // 주소 검색
    const handleSearch = () => {
        if (!inputAddress.trim()) {
            alert("주소를 입력하세요");
            return;
        }

        const geocoder = new window.google.maps.Geocoder();//Google Maps의 Geocoder를 사용해 주소 → 좌표로 변환
        geocoder.geocode({ address: inputAddress }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const loc = results[0].geometry.location;//좌표값
                const address = results[0].formatted_address;//주소

                setClickedLatLng(loc);//검색된 좌표를 clickedLatLng로 저장하고
                setLocation(loc);        // 위치 저장
                setLocaAddress(address); // 주소 저장
                map?.panTo(loc); // 지도를 그 위치로 이동


            } else {
                alert('주소를 찾을 수 없습니다.');
            }
        });
    };

    return (
        <div className="w-full h-[400px] relative rounded-lg overflow-hidden">
            <div className={`font-semibold text-sm pb-1 break-keep text-textBlack`}>{locaAddress}</div>
            {clickedLatLng && (//마커 찍혔을 때만
                <input
                    type="text"
                    value={detailAddress}
                    onChange={(e) => setDetailAddress(e.target.value)}
                    placeholder="정확한 장소명을 입력해주세요"
                    className="w-full mb-2 "
                    autoComplete="off"
                />
            )}

            {/* 검색창 */}
            <div className={`absolute z-10 bg-white p-2 rounded shadow-md flex gap-2 m-2`}>
                <SearchInput
                    inputPlaceholder={`주소 입력`}
                    value={inputAddress}
                    onChange={(e) => setInputAddress(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    onSearch={handleSearch}
                />
            </div>

            {/* 지도 */}

            <Map
                defaultZoom={13}
                defaultCenter={{lat: 37.5665, lng: 126.9780}} // 서울 기준
                className={`border w-full h-full rounded`}
                onClick={handleMapClick}
            >
                {clickedLatLng && <Marker position={clickedLatLng}/>}
            </Map>
        </div>
    );
}
