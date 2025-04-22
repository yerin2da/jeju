import React, {useState, useMemo, useEffect} from "react";
import ToggleContent from "../components/ToggleContent";
import { FiPlus, FiMinus } from "react-icons/fi";
import MyDatePicker from "../components/MyDatePicker";
import MyTimePicker from "../components/MyTimePicker";
import TailButton from "../UI/TailButton";
import CountrySelTab from "../components/CountrySelTab";
import ImageUpload from "../components/ImageUpload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomMap from "../components/CustomMap";
import {useRecoilValue} from "recoil";
import { useResetRecoilState } from 'recoil';
import {
    dateAtom,
    timeAtom,
    locationAtom,
    currencyAtom,
    detailAddressAtom,
    imageIdxAtom,
    imageUrlAtom, clickedLatLngAtom
} from "../recoil/atoms";
import useToggleOpen from "../hooks/useToggleOpen";

const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/Trade/sell`;

export default function Sell() {
    const navigate = useNavigate();
    const { openIndex, handleToggle } = useToggleOpen();// 토글 오픈 상태

    const user_idx = localStorage.getItem("user_idx");//user_idx
    const date = useRecoilValue(dateAtom); // 날짜
    const time = useRecoilValue(timeAtom);//시간
    const currencyData = useRecoilValue(currencyAtom);// 화폐 옵션
    const location = useRecoilValue(locationAtom);// 장소 선택 좌표값
    const detailAddress = useRecoilValue(detailAddressAtom);// 상세장소
    const imageIdx = useRecoilValue(imageIdxAtom);// 이미지idx


    // 각 atom에 대해 초기화 함수 선언
    const resetDate = useResetRecoilState(dateAtom);
    const resetTime = useResetRecoilState(timeAtom);
    const resetCurrency = useResetRecoilState(currencyAtom);
    const resetLocation = useResetRecoilState(locationAtom);//거래장소 좌표값
    const resetDetailAddress = useResetRecoilState(detailAddressAtom);//상세주소
    const resetClickedLatLngAtom = useResetRecoilState(clickedLatLngAtom);//마커
    const resetImageIdx = useResetRecoilState(imageIdxAtom);
    const resetImageUrl = useResetRecoilState(imageUrlAtom);//미리보기

    // 컴포넌트 마운트 시 초기화
    useEffect(() => {
        // 마운트 시 초기화
        resetDate();
        resetTime();
        resetCurrency();
        resetLocation();
        resetDetailAddress();
        resetClickedLatLngAtom();
        resetImageIdx();
        resetImageUrl();
    }, []);

    // 유효성 체크
    const isDateFilled = !!date;
    const isTimeFilled = !!time;
    const isCountFilled = Object.values(currencyData.count).some((v) => v > 0);
    const isLocationFilled = !!location && !!detailAddress;

    const isValid = useMemo(() => {
        return isDateFilled && isTimeFilled && isCountFilled && isLocationFilled ;
    }, [isDateFilled, isTimeFilled, isCountFilled, isLocationFilled, ]);

   const handleSave = async () => {
       if (!isValid) {
           alert('모든 필수항목을 채워주세요');
           return;
       }
        try {
            console.log("사용자 IDX (user_idx):", user_idx);
            console.log("화폐 코드 (code):", currencyData.isoCode);
            console.log("만날장소 좌표1 (meet_lat):", location.lat);
            console.log("만날장소 좌표2 (meet_lng):", location.lng);
            console.log("만날 일시 (meet_date):", date);
            console.log("만날 시간 (meet_time):", time);
            console.log("기타 (meet_etc):", detailAddress);
            console.log("거래할 화폐의 권종 IDX (trade_currency_type_idx[]):", currencyData.trade_currency_type_idx);
            console.log("거래할 화폐(권종별)수량 (curency_count[]):", currencyData.curency_count);
            console.log("image_idx:", imageIdx);

            const params = new URLSearchParams();
            params.append("user_idx", user_idx);//사용자 IDX
            params.append("code", currencyData.isoCode);//화폐 코드
            params.append("meet_lat", location.lat);//만날장소 좌표1
            params.append("meet_lng", location.lng);//만날장소 좌표2
            params.append("meet_date", date);//만날 일시
            params.append("meet_time", time);//만날 시간
            params.append("meet_etc", detailAddress);//기타
            currencyData.trade_currency_type_idx.forEach((idx) => {
                params.append("trade_currency_type_idx[]", idx);//거래할 화폐의 권종 IDX
            });

            currencyData.curency_count.forEach((cnt) => {
                params.append("curency_count[]", cnt);//거래할 화폐(권종별)수량
            });
            params.append("image_idx", imageIdx);//이미지 idx


            const { data } = await axios.post(url, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 5000,//5초
            });

            if (data.result === "success") {
                const { trade_idx } = data.code;

                console.log("거래코드 :", trade_idx);
                navigate("/sell/complete");
            } else {
                alert(data.msg);
            }
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.error('요청 시간이 초과되었습니다!');
                alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
            } else {
                console.error("API 요청 에러:", error);
                alert("서버 오류가 발생했습니다.");
            }
        }
   };

    return (
        <div className="w-full px-4 pt-4 pb-8 ">

            {/* 날짜 선택 */}
            <ToggleContent
                title="날짜 선택"
                subtitle="*필수"
                txt="거래할 날짜를 선택하세요."
                iconOpen={FiPlus}
                iconClose={FiMinus}
                isOpen={openIndex === 0}
                onToggle={() => handleToggle(0)}
                isFilled={isDateFilled && isTimeFilled}
                titWrapClassName="gap-3"
                hiddenConClassName="pt-4"
            >
                <MyDatePicker />
                <p className="text-textBlack pt-4 pb-2 text-sm">거래 가능 시간</p>
                <MyTimePicker />
            </ToggleContent>

            {/* 화폐 선택 */}
            <ToggleContent
                title="화폐 옵션 선택"
                subtitle="*필수"
                txt="거래할 화폐를 선택하세요."
                iconOpen={FiPlus}
                iconClose={FiMinus}
                isOpen={openIndex === 1}
                onToggle={() => handleToggle(1)}
                isFilled={isCountFilled}
                titWrapClassName="gap-3"
                hiddenConClassName="pt-4"
            >
                <CountrySelTab/>
            </ToggleContent>

            {/* 장소 선택 */}
            <ToggleContent
                title="장소 선택"
                subtitle="*필수"
                txt="거래할 장소를 클릭해 주세요."
                iconOpen={FiPlus}
                iconClose={FiMinus}
                isOpen={openIndex === 2}
                onToggle={() => handleToggle(2)}
                isFilled={isLocationFilled}
                titWrapClassName="gap-3"
                hiddenConClassName="pt-4"
            >
                <CustomMap/>
            </ToggleContent>

            {/* 이미지 업로드 */}
            <ImageUpload
                className="w-full pb-4"
            />

            {/* 등록버튼 */}
            <TailButton
                className="w-full"
                caption="등록하기"
                bcolor="btn-subColor2"
                handleClick={handleSave}
            />
        </div>
    );
}
