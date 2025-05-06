import data from "../../db/data.json";
import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";

import {useRecoilState} from "recoil";

import {useLocation, useNavigate, useParams} from "react-router-dom";

import {ImSpinner2} from "react-icons/im";
import {pageState} from "../../store/noticeState";
import TabMenuSlider from "../../components/TabMenuSlider";
import SearchInput from "../../components/SearchInput";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";
import JejuThemeGalleryCard from "../../components/JejuThemeGalleryCard";


const apiKey = process.env.REACT_APP_API_KEY;


const JejuThemeGallery = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [tdata, setTdata] = useState([])//전체 데이터

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initCategory = queryParams.get("category") || '163';

    const [selC1, setSelC1] = useState(initCategory);
    const [selectedTag, setSelectedTag] = useState(null);//중메뉴

    const [inputValue, setInputValue] = useState(""); // 인풋 필드 값
    const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (실제 필터에 사용)

    const [currentPage, setCurrentPage] = useRecoilState(pageState); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1);   // 총 페이지 수

    const itemsPerPage = 4; // 한 페이지당 글 목록 수
    const startIndex = (currentPage - 1) * itemsPerPage;

    // 4. 데이터 필터링 + 중복제거 및 페이징
    const filteredData = Array.from(
        new Map(
            tdata
                .filter(item => {
                    const matchCategory = item.courseId?.toString() === selC1;
                    const matchKeyword =
                        searchKeyword === "" ||
                        item.courseName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.spotName?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                        item.thema?.toLowerCase().includes(searchKeyword.toLowerCase());
                    const matchTag =
                        !selectedTag || (item.alltag && item.alltag.includes(selectedTag));

                    return matchCategory && matchKeyword && matchTag;
                })
                .map(item => [item.spotAreaId, item]) // 중복 제거 key 기준
        ).values()
    );

    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);//시작 인덱스, 마지막 인덱스

    const getFetchAllData = async (courseId) => {
        setIsLoading(true);
        // const now = new Date();
        // const CURRENT_DATE = now.toISOString().slice(0, 10).replace(/-/g, '');

        try {
            const url = `https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1?serviceKey=${apiKey}&dataType=JSON&CURRENT_DATE=2025050409&HOUR=24&COURSE_ID=${courseId}`;
            console.log('요청 URL:', url);

            const { data } = await axios.get(url);
            const itemData = data?.response?.body?.items?.item;
            const parsed = Array.isArray(itemData) ? itemData : itemData ? [itemData] : [];

            const result = parsed.map(item => ({
                ...item,
                courseId: courseId  // ✅ 정확히 해당 courseId만 주입
            }));

            setTdata(result);
            console.log("받은 데이터:", result);
        } catch (e) {
            console.error("API 호출 실패", e);
        } finally {
            setIsLoading(false);
        }
    };
    const { category } = useParams();

    useEffect(() => {
        // const queryParams = new URLSearchParams(location.search);
        const currentCategory = category || '163';

        setSelC1(currentCategory);
        getFetchAllData(currentCategory);
    }, [category]); //  category 기준으로 패칭


    // 카테고리 변경
    const handleSelC1 = (code) => {
        setSelC1(code);
        setSelectedTag(null); // #태그 선택 초기화
        navigate(`/theme/gallery/${code}`); //  URL 업데이트
        getFetchAllData(code);

        setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //게시글 클릭
    const handleItemClick = (id) => {
        // navigate(`/jeju/${id}`);
    }

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

    // 5. 페이지 수 업데이트
    useEffect(() => {
        const total = filteredData.length;
        const pagesCalc = Math.ceil(total / itemsPerPage);//페이징
        setTotalPages(pagesCalc > 0 ? pagesCalc : 1);
    }, [filteredData]);


    return (
        <div>
            <div className="sticky top-0 bg-white">

                {/* 검색창 */}
                <div className={`py-5 `}>
                    <SearchInput
                        inputPlaceholder={`검색어를 입력해주세요`}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>

                {/* 대분류 탭 */}
                <TabMenuSlider
                    spaceBetween={3}
                    data={data.jejuThemeCategory}
                    onClick={handleSelC1}
                    selTab={selC1}
                    tClass={`bg-mainColor text-white`}
                    fClass={`text-textBlack `}
                />
            </div>

                {isLoading ? (
                    <div
                        className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600 transition-opacity duration-700 opacity-100 pointer-events-none">
                        <ImSpinner2 className="animate-spin text-3xl text-gray-600"/>
                        <p>테마별 관광지 정보를 불러오고 있어요</p>
                    </div>
                ) : (
                    <>
                        {/*글 목록*/}
                        {paginatedData.length !== 0 ?
                            (
                                paginatedData.map((item, spotAreaId) =>
                                    <JejuThemeGalleryCard
                                        key={item.spotAreaId}
                                        // onClick={() => handleItemClick(item.spotAreaId)}
                                        item={item}
                                    />)
                            ) : (
                                <NoResult/>
                            )}

                        {/*페이지네이션*/}
                        <PaginationSimple
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </>
                )}
            </div>
            );
            };

            export default JejuThemeGallery;