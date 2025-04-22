// import {useParams} from "react-router-dom";
//
// export default function WalletLayout() {
//     const item = useParams().item;
//     const fruits = ['🍎', '🍌', '🍉'];
//     return (
//         <div>
//             wallet : {item}
//             {fruits.includes(item) ? '과일입니다'
//                                    : '과일이 아닙니다'
//             }
//         </div>
//     );
// };

import React, {useEffect, useState} from "react";
import axios from "axios";
import TailButton from "../UI/TailButton";
import {IoSearch} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {categories, walletCate} from "../constants/categories"; // 카테고리 import!
import { walletCategoryState, pageState } from "../store/noticeState";
import {useRecoilState} from "recoil";
import {FiMinus, FiPlus} from "react-icons/fi";
import CountrySelTab from "../components/CountrySelTab";
import ToggleContent from "../components/ToggleContent";
import IconImage from "../components/IconImage";
import { FiMapPin } from "react-icons/fi";
import { LuClock } from "react-icons/lu";
import { FaAngleDown , FaAngleUp } from "react-icons/fa6";
import useToggleOpen from "../hooks/useToggleOpen";


const noticeList = [
    {
        id: 1,
        category: "myCoin",
        title: "거래 요청 및 채팅 서비스 일시 중단 안내",
        date: "2024-03-10",
        content: "서버 점검으로 인한 서비스 일시 중단 안내입니다.",
    },{
        id: 4,
        category: "myCoin",
        title: "거래 요청 및 채팅 서비스 일시 중단 안내",
        date: "2024-03-10",
        content: "서버 점검으로 인한 서비스 일시 중단 안내입니다.",
    },
    {
        id: 2,
        category: "exchangeList",
        title: "뀨",
        subtitle:"거래중",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "미국 달러",
        code: "USD",
        amount: "122,196",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    },{
        id: 3,
        category: "exchangeList",
        title: "다정한7호선",
        subtitle:"거래완료",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "베트남 동",
        code: "VND",
        amount: "100,000,456",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    }


];

export default function Wallet() {
//1. 토글
    const { openIndex, handleToggle } = useToggleOpen();

    const url = "";
    const [tdata, setTdata] = useState(noticeList); // 전체 데이터 (목록)
    const [selC1, setSelC1] = useRecoilState(walletCategoryState);      // 선택한 카테고리

    const [inputValue, setInputValue] = useState(""); // 인풋 필드 값
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (실제 필터에 사용)

    const [currentPage, setCurrentPage] = useRecoilState(pageState); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1);   // 총 페이지 수

    const navigate = useNavigate();

    const itemsPerPage = 5; // 한 페이지당 글 목록 수


    //게시글 클릭
    // const handleItemClick = (id) => {
    //     navigate(`/notice/${id}`);
    // }

    // 카테고리 변경
    const handleSelC1 = (category) => {
        setSelC1(category.id);
        setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    //  3. 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url);
                console.log("응답 데이터 구조 확인:", data);
                setTdata(data);
            } catch (error) {
                console.warn("더미 데이터로 대체합니다.");
                setTdata(noticeList);
            }
        };

        fetchData();
    }, []);

    // 4. 데이터 필터링 및 페이징
    const filteredData = tdata.filter(item => {
        const matchCategory = selC1 === "all" || item.category === selC1;
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
        <div className="w-full h-full flex flex-col flex-1 px-4 bg-mainBg pt-20 pb-2">
            {/* 대분류 탭 */}
            <div
                className="font-medium w-full flex justify-start gap-2 items-center h-16 bg-white overflow-x-auto fixed top-[88px] left-0 px-5 text-sm">
                {walletCate.map((category) => (
                    <button
                        key={category.id}
                        className={`px-3 h-8 rounded-full whitespace-nowrap 
                          ${
                            selC1 === category.id
                                ? "bg-mainColor text-white"
                                : "bg-white text-textBlack"
                        }`}
                        onClick={() => handleSelC1(category) }
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            {/* 글 목록 */}
            {paginatedData.map((item,idx) => {
                const isInProgress = item.subtitle === "거래중"; // 공통 조건 변수로 묶기!
                const isOpen = idx === 0 || openIndex === idx; // 첫 번째 항목은 무조건 열림

                return (
                    <ToggleContent
                        key={item.id}
                        title={item.title + ` 님`}
                        titClassName={`order-2 
                                        ${isInProgress
                                            ? "text-textBlack"
                                            : "text-textDarkGray"
                                        }`}
                        subtitle={item.subtitle}
                        subTitClassName={`rounded-full px-2 py-0.4 text-white
                                            ${isInProgress ? "bg-mainColor" : "bg-textBlack"}`}//거래중:거래완료
                        txt={
                            openIndex === idx
                                ? null // 열려있을 땐 숨기기
                                : (
                            <div className={`flex items-center gap-2 whitespace-nowrap text-base font-medium
                                            ${isInProgress
                                                ? "text-subColor2"
                                                : "text-textBlack"
                                            }
                            `}>
                                <IconImage imageSrc={`/img/${item.code}.png`} className={`h-4 xs:h-5 border border-textLightGray`} title={`국기`}/>
                                <p className={``}>{item.name}</p>
                                <p className={``}>{item.amount}원</p>
                            </div>
                        )}
                        iconOpen={FaAngleDown }
                        iconClose={FaAngleUp}
                        isOpen={openIndex === idx}
                        onToggle={() => handleToggle(idx)}
                        isFilled={null}
                        titWrapClassName="gap-2 pb-4"
                    >

                        {/*히든박스*/}
                        <div className={`flex flex-col rounded-lg border-2 overflow-hidden
                                            ${isInProgress 
                                                ? "border-midPurple" 
                                                : "border-textLightGray"
                                            }
                        `}>
                            {/*  국기, 화폐, 가격*/}
                            <div className={`w-full flex items-center px-4 py-2 gap-2 whitespace-nowrap text-base font-medium
                                            ${isInProgress
                                                ? "text-subColor2 bg-lightPurple"
                                                : "text-textBlack bg-textLightGray"
                                            }
                            
                            `}>
                                <IconImage imageSrc={`/img/${item.code}.png`}
                                           className={`h-4 xs:h-5 border border-textLightGray`} title={`국기`}/>
                                <p className={``}>{item.name}</p>
                                <p className={``}>{item.amount}원</p>
                            </div>

                            {/* 거래내역 */}
                            <div className={`px-2 py-3 max-w-screen-xs`}>
                                {item.units && item.units.length > 0 && (
                                    // 동전 개수
                                    <ul className="grid grid-cols-3 sm:grid-cols-3 gap-1 mb-2 text-subColor2 pb-4">
                                        {item.units.map((unitItem, idx) => (
                                            <li key={idx} className={`text-center px-1 py-1 rounded xs:rounded-lg text-xs xs:text-sm max-w-[250px]
                                            ${isInProgress
                                                ? "bg-lightPurple"
                                                : " border border-textDarkGray text-textBlack"
                                            }
                                            `}>
                                                <span className={`pr-1 whitespace-nowrap`}>{unitItem.name}</span>
                                                <span className="whitespace-nowrap ">{unitItem.unit}개</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                <div className="text-sm xs:text-base flex items-center gap-4">
                                    <p className={`text-textDarkGray flex items-center gap-2`}><LuClock />거래일시</p>
                                    <p className={`
                                                    ${isInProgress
                                                        ? "text-subColor2"
                                                        : "text-textBlack"
                                                    }
                                    `}>24.11.13(수) 오전 01:10</p>
                                </div>
                                <div className="text-sm xs:text-base flex items-center gap-4">
                                    <p className={`text-textDarkGray flex items-center gap-2`}><FiMapPin />거래장소</p>
                                    <p className={`
                                                    ${isInProgress
                                                        ? "text-subColor2"
                                                        : "text-textBlack"
                                                    }
                                    `}>논현역 3번출구</p>
                                </div>
                            </div>
                        </div>
                    </ToggleContent>
                );
            })}

        </div>
    );
};