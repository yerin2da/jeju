
import GalleryCard from "../components/GalleryCard";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import SearchLiveCurrency from "../components/SearchLiveCurrency";
import SearchInput from "../components/SearchInput";
import { useLocation } from "react-router-dom";
import NoResult from "../components/NoResult";

export default function FindCurrency() {
    const location = useLocation();//useLocation(): 현재 페이지에 어떤 값이 넘어왔는지 알 수 있는 리액트 훅
    const initialKeyword = location.state?.keyword || ""; // ← 넘어온 객체에서 키워드 가져오기
    const keywordRef = useRef();  // input에 연결

    const [tdata, setTdata] = useState([]);
    const [cards, setCards] = useState([]);//환율박스

    // 페이지 들어오자마자 넘어온 keyword값으로 자동 검색
    useEffect(() => {
        if (initialKeyword) {
            // ref에 값 설정
            if (keywordRef.current) { //input이 있는지 확인
                keywordRef.current.value = initialKeyword;
            }
            getFetchData(initialKeyword); // 자동 검색 실행
        }
    }, [initialKeyword]);

    //데이터 가져오기
    const getFetchData = async (keyword) => {

        const apiKey = process.env.REACT_APP_API_BASE_URL;
        const url = `${apiKey}/Trade/findCurrrency?currency=${encodeURIComponent(keyword)}`;

        try{
            const { data } = await axios.get(url);
            console.log("화폐검색 데이터:", data);

            if (data.result === "success") {
                setTdata(data.code);
            } else{
                console.log(data.msg || "실패");
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

    }

    // 검색버튼
    const handleSearch = () => {
        const keyword = keywordRef.current?.value;
        if (!keyword) {
            alert("키워드를 입력하세요");
            keywordRef.current.focus();
            return;
        }
        getFetchData(keyword);
    };

    // 환율 박스
    useEffect(() => {
        if (tdata.length === 0) {
            setCards([
                <NoResult/>
            ]);
        } else {
            setCards(
                tdata.map((item) => (
                    <SearchLiveCurrency key={item.code} item={item} />
                ))
            );
        }
    }, [tdata]);

    return (
        <div className={`w-full h-full bg-mainBg`}>
            <div className={`bg-midBlack pb-6 px-5`}>
                <SearchInput
                    inputPlaceholder={`검색어를 입력하세요 ex) USD, 일본, 엔`}
                    ref={keywordRef}
                    className={`w-full rounded-full`}
                    onSearch={handleSearch}
                />
            </div>

            <>
                {/*환율박스*/}
                {cards}

                {/*거래내역 박스*/}
                <div className={`p-5`}>
                    {/*필터*/}
                    <div className={`text-sm text-right pb-5`}>필터 최신순</div>

                    {/*흰색카드*/}
                    <GalleryCard/>
                </div>
            </>

        </div>
    );
};