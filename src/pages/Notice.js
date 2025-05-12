import React, {useEffect, useState} from "react";
import axios from "axios";
import TailButton from "../UI/TailButton";
import {useNavigate} from "react-router-dom";
import { categoryState, pageState } from "../store/noticeState";
import {useRecoilState} from "recoil";

import TabMenuSlider from "../components/TabMenuSlider";
import data from "../db/data.json";
import SearchInput from "../components/SearchInput";
//
//
// const noticeList = [
//     {
//         id: 1,
//         code: "system",
//         title: "거래 요청 및 채팅 서비스 일시 중단 안내",
//         date: "2024-03-10",
//         content: "서버 점검으로 인한 서비스 일시 중단 안내입니다.",
//     },
//     {
//         id: 2,
//         code: "update",
//         title: "시스템 개선 및 UI 개편 안내",
//         date: "2024-03-08",
//         content: "새로운 기능이 추가된 웹 업데이트가 완료되었습니다.",
//     },
//     {
//         id: 3,
//         code: "security",
//         title: "계정 보호를 위한 OTP 인증 필수 적용",
//         date: "2024-03-05",
//         content: "보안 강화를 위한 패치가 적용되었습니다.",
//     },
//     {
//         id: 4,
//         code: "etc",
//         title: "외화 등록 후 거래 대기 시간 변경",
//         date: "2024-03-01",
//         content: "기타 공지사항 내용을 확인해 주세요.",
//     },
//     {
//         id: 5,
//         code: "system",
//         title: "긴급 서버 점검",
//         date: "2024-02-28",
//         content: "긴급 서버 점검으로 인해 서비스가 중단됩니다.",
//     },
//     {
//         id: 6,
//         code: "system",
//         title: "6",
//         date: "6",
//         content: "6",
//     },{
//         id: 7,
//         code: "system",
//         title: "7",
//         date: "6",
//         content: "6",
//     },{
//         id: 8,
//         code: "system",
//         title: "8",
//         date: "6",
//         content: "6",
//     },{
//         id: 9,
//         code: "system",
//         title: "9",
//         date: "6",
//         content: "6",
//     },{
//         id: 10,
//         code: "system",
//         title: "10",
//         date: "6",
//         content: "6",
//     },
// ];

export default function Guide() {

    const url = "guide";
    const [tdata, setTdata] = useState(data.noticeList); // 전체 데이터 (목록)
    const [selC1, setSelC1] = useRecoilState(categoryState);      // 선택한 카테고리

    const [inputValue, setInputValue] = useState(""); // 인풋 필드 값
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (실제 필터에 사용)

    const [currentPage, setCurrentPage] = useRecoilState(pageState); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1);   // 총 페이지 수

    const navigate = useNavigate();

    const itemsPerPage = 9; // 한 페이지당 글 목록 수

    //게시글 클릭
    const handleItemClick = (id) => {
        navigate(`/notice/${id}`);
    }

    // 카테고리 변경
    const handleSelC1 = (code) => {
        setSelC1(code);
        setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //검색어 입력
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // 인풋이 비었을 때 전체 데이터 다시 보여주기
        if (value === "") {
            setSearchKeyword("");
            setCurrentPage(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    //검색 버튼
    const handleSearch = () => {
        setSearchKeyword(inputValue);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //이전 버튼
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    //다음 버튼
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    //  3. 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const { data } = await axios.get(url);
            //     console.log("응답 데이터 구조 확인:", data);
            //     setTdata(data);
            // } catch (error) {
            //     console.warn("더미 데이터로 대체합니다.");
            setTdata(data.noticeList);

            // }
        };

        fetchData();
    }, []);

    // 4. 데이터 필터링 및 페이징
    const filteredData = tdata.filter(item => {
        const matchCategory = selC1 === "all" || item.code === selC1;
        const matchKeyword =
            searchKeyword === "" ||
            item.title.includes(searchKeyword) ||
            item.content.includes(searchKeyword);

        return matchCategory && matchKeyword;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);//시작 인덱스, 마지막 인덱스

    // 5. 페이지 수 업데이트
    useEffect(() => {
        const total = filteredData.length;
        const pagesCalc = Math.ceil(total / itemsPerPage);//페이징
        setTotalPages(pagesCalc);
    }, [filteredData]);

    // 6. 페이지 이동 시 스크롤 최상단
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);


    return (
        <div className="">

            <div className="sticky top-0 pt-5 bg-white">
                {/* 대분류 탭 */}
                <TabMenuSlider
                    spaceBetween={3}
                    data={data.guideCategory}
                    onClick={handleSelC1}
                    selTab={selC1}
                    tClass={`bg-mainColor text-white`}
                    fClass={`text-textBlack `}
                />

                <div className={`py-5 `}>
                    {/* 서치인풋 */}
                    <SearchInput
                        inputPlaceholder={`검색어를 입력해주세요`}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>
            </div>

            {/* 글 목록 */}
            {paginatedData.reverse().map((item) => (
                <div key={item.id}
                     onClick={() => handleItemClick(item.id)}
                     className={`cursor-pointer border-t border-textLightGray py-6 flex flex-col gap-3`}>
                    <p className="text-base font-normal multi-ellipsis">
                        [{data.guideCategory?.find(cat => cat.code === item.code)?.label}]
                        <span className="pl-1">{item.title}</span>
                    </p>
                    <p className={`text-sm text-textDarkGray`}>{item.date}</p>
                </div>
            ))}

            <div className="text-base flex justify-center items-center pt-4 text-textDarkGray">
                <TailButton
                    caption="이전"
                    bcolor="blue"
                    handleClick={handlePrev}
                    disabled={currentPage === 1}
                />
                <span className="px-4 text-textBlack"> {currentPage} / {totalPages} </span>
                <TailButton
                    caption="다음"
                    bcolor="blue"
                    handleClick={handleNext}
                    disabled={currentPage === totalPages}
                />
            </div>

        </div>
    );
};