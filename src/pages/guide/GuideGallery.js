import data from "../../db/data.json";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import GuideGalleryCard from "./GuideGalleryCard";
import { useRecoilState } from "recoil";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { pageState } from "../../store/noticeState";
import TabMenuSlider from "../../components/TabMenuSlider";
import SearchInput from "../../components/SearchInput";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";

const GuideGallery = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tdata, setTdata] = useState([]);

    //쿼리스트링 - 히스토리 기억
    const [searchParams, setSearchParams] = useSearchParams();// URL의 쿼리 파라미터를 읽고 수정할 수 있게 해주는 훅

    const category = searchParams.get("category") || "c1";//URL에서 "category"라는 쿼리 파라미터 값을 가져옴

    const popularFromURL = searchParams.get("popular")?.split(",") || [];//인기태그 파라미터

    const tagsFromURL = searchParams.get("tags")?.split(",") || [];//초록태그 파라미터

    const [selC1, setSelC1] = useState(category);

    const [selectedPopularTags, setSelectedPopularTags] = useState(popularFromURL);

    const [selectedAllTags, setSelectedAllTags] = useState(tagsFromURL);

    useEffect(() => {
        const params = new URLSearchParams();//URLSearchParams 객체를 새로 생성

        if (selC1) params.set("category", selC1);//selC1이 존재하면 "category" 파라미터를 설정

        if (selectedPopularTags.length > 0) params.set("popular", selectedPopularTags.join(","));

        if (selectedAllTags.length > 0) params.set("tags", selectedAllTags.join(","));

        setSearchParams(params);//쿼리 파라미터를 URL에 반영

    }, [selC1, selectedPopularTags, selectedAllTags]);


    const [inputValue, setInputValue] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");

    const [currentPage, setCurrentPage] = useRecoilState(pageState);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 9;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const popularTags = ['유네스코', '오름', '액티비티', '올레', '경관/포토'];

    // 태그 선택 토글 핸들러
    const toggleTag = (tag, selectedTags, setTags) => {
        if (selectedTags.includes(tag)) {
            setTags(selectedTags.filter(t => t !== tag));// 이미 있으면 제거
        } else {
            setTags([...selectedTags, tag]);// 없으면 추가
        }
    };

    // 데이터 가져오기
    const getFetchAllData = async (category) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.PUBLIC_URL}/db/all.json`);
            setTdata(data.guide || []);
        } catch (error) {
            console.error("전체 데이터 로딩 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selC1) {
            getFetchAllData(selC1); // selC1이 바뀔 때마다 fetch
        }
    }, [selC1]);


    // 필터링
    const filteredData = tdata.filter(item => {
        const matchCategory = item.contentscd?.value === selC1; //c1~c5

        const matchKeyword = //검색어(제목, 태그, 주소 포함)
            searchKeyword === "" ||
            item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.alltag?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.address?.toLowerCase().includes(searchKeyword.toLowerCase());

        const alltags = item.alltag //태그 가공
            ?.split(/[,#]/)
            .map(tag => tag.trim())
            .filter(Boolean) || [];

        //콘텐츠에 선택된 인기태그랑 태그가 들어있는지 확인하기
        const matchPopularTags = selectedPopularTags.every(tag => item.alltag?.includes(tag)); //인기태그
        const matchAllTags = selectedAllTags.every(tag => alltags.includes(tag));//태그

        return matchCategory && matchKeyword && matchPopularTags && matchAllTags;
    });

    //정렬 (인기태그기준)
    const sortedData = selectedPopularTags.length > 0
        ? [...filteredData].reverse().sort((a, b) => {//기존 filteredData 배열을 얕은 복사하여 sortedData로 정렬 가능한 새 배열을 만듦

            const tag = selectedPopularTags[0];//선택된 태그 중 앞에것을 기준으로 적용

            const aPriority = a.priority?.[tag] ?? 9999;//우선순위 있으면 값, 없으면 맨 뒤로
            const bPriority = b.priority?.[tag] ?? 9999;

            return aPriority - bPriority;//a가 b보다 우선순위가 낮으면 앞으로 오도록 정렬(음수면 a가 더 작다는 것)
            })
        : [...filteredData].reverse().sort((a, b) => {//미선택시
            const aHasPriority = a.priority ? 1 : 0;
            const bHasPriority = b.priority ? 1 : 0;

            if (aHasPriority !== bHasPriority) {
                return bHasPriority - aHasPriority; // priority 있는 애가 앞으로
            }
            return 0; // 동일한 경우에는 순서 유지
        });

    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    // 카테고리 전환
    const handleSelC1 = (code) => {
        setSelC1(code);
        navigate(`/guide/gallery/${code}`);
        getFetchAllData(code);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemClick = (id, code) => {
        navigate(`/guide/gallery/${code}/${id}`, { state: { id } });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
            setSearchKeyword("");
            setCurrentPage(1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSearch = () => {
        setSearchKeyword(inputValue);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // 페이지 수 업데이트
    useEffect(() => {
        const total = filteredData.length;
        const pagesCalc = Math.ceil(total / itemsPerPage);
        setTotalPages(pagesCalc);
    }, [filteredData]);


    return (
        <div>
            <div className="bg-white py-5 z-10">
                {/* 검색창 */}
                <div className="pb-5">
                    <SearchInput
                        inputPlaceholder={`검색어를 입력해주세요`}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>

                <div className={`pb-5`}>
                    {/* 대분류 탭 */}
                    <TabMenuSlider
                        spaceBetween={3}
                        data={data.jejuCategory}
                        onClick={handleSelC1}
                        selTab={selC1}
                        tClass={`bg-black text-white`}
                        fClass={`text-textBlack bg-gray-100`}
                        btnClass={``}
                    />
                </div>

                {/* 선택된 태그 */}
                {[...selectedPopularTags, ...selectedAllTags].length > 0 && (
                    <div className="w-full flex gap-2 py-2 flex-wrap items-center pb-3">
                        {selectedPopularTags.map(tag => (
                            <span
                                key={`selected-pop-${tag}`}
                                className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-3 py-1.5 rounded-full border border-yellow-300 cursor-pointer hover:bg-yellow-200"
                                onClick={() => toggleTag(tag, selectedPopularTags, setSelectedPopularTags)}
                            >
                                #{tag}
                                <span className="ml-2 text-xs text-yellow-600 font-bold">✕</span>
                            </span>
                        ))}
                        {selectedAllTags.map(tag => (
                            <span
                                key={`selected-all-${tag}`}
                                className="inline-flex items-center border bg-[#E7F0D2] text-[#739D64] border-[#739D64] text-sm px-3 py-1 rounded-full cursor-pointer hover:bg-green-100"
                                onClick={() => toggleTag(tag, selectedAllTags, setSelectedAllTags)}
                            >
                                #{tag}
                                <span className="ml-2 text-xs text-green-700 font-bold">✕</span>
                            </span>
                        ))}
                    </div>
                )}


                {/* 인기태그 버튼 */}
                <div className={`text-sm `}>
                    <p className={`text-gray-400 font-semibold pb-2`}>인기태그</p>
                    <div className="flex flex-wrap gap-3 ">
                        {popularTags.map(tag => (
                            <button
                                key={`pop-${tag}`}
                                onClick={() => toggleTag(tag, selectedPopularTags, setSelectedPopularTags)}
                                className={` bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full border border-gray-200 cursor-pointer hover:bg-gray-200`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>

            </div>

            {/* 로딩 */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600">
                    <ImSpinner2 className="animate-spin text-3xl"/>
                    <p>관광지 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <div>
                    {paginatedData.length !== 0 ? (
                        paginatedData.map(item => (
                            <GuideGalleryCard
                                key={item.contentsid}
                                item={item}
                                onClick={() => handleItemClick(item.contentsid, selC1)}
                                onClickSpan={(kw) => toggleTag(kw, selectedAllTags, setSelectedAllTags)}
                            />
                        ))
                    ) : (
                        <NoResult />
                    )}

                    <PaginationSimple
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default GuideGallery;
