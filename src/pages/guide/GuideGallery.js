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
    const [searchParams, setSearchParams] = useSearchParams();

    const category = searchParams.get("category") || "c1";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const popularFromURL = searchParams.get("popular")?.split(",").filter(Boolean) || [];
    const tagsFromURL = searchParams.get("tags")?.split(",").filter(Boolean) || [];

    const [selC1, setSelC1] = useState(category);
    const [selectedPopularTags, setSelectedPopularTags] = useState(popularFromURL);
    const [selectedAllTags, setSelectedAllTags] = useState(tagsFromURL);
    const [inputValue, setInputValue] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;

    const popularTags = ['유네스코', '오름', '액티비티', '올레', '경관/포토'];

    const toggleTag = (tag, selectedTags, setTags) => {
        if (selectedTags.includes(tag)) {
            setTags(selectedTags.filter(t => t !== tag));
        } else {
            setTags([...selectedTags, tag]);
        }
    };

    const getFetchAllData = async () => {
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
        getFetchAllData();
    }, [selC1]);

    useEffect(() => {
        const prevCategory = searchParams.get("category") || "";
        const prevPopular = searchParams.get("popular") || "";
        const prevTags = searchParams.get("tags") || "";

        const newPopular = selectedPopularTags.join(",");
        const newTags = selectedAllTags.join(",");

        const params = new URLSearchParams(searchParams);
        params.set("category", selC1);

        if (selectedPopularTags.length > 0) {
            params.set("popular", newPopular);
        } else {
            params.delete("popular");
        }

        if (selectedAllTags.length > 0) {
            params.set("tags", newTags);
        } else {
            params.delete("tags");
        }

        const changed =
            prevCategory !== selC1 ||
            prevPopular !== newPopular ||
            prevTags !== newTags;

        if (changed) {
            params.set("page", "1");
        }

        setSearchParams(params, { replace: true });

    }, [selC1, selectedPopularTags, selectedAllTags]);

    useEffect(() => {
        const updatedPopular = searchParams.get("popular")?.split(",").filter(Boolean) || [];
        const updatedTags = searchParams.get("tags")?.split(",").filter(Boolean) || [];

        setSelectedPopularTags(updatedPopular);
        setSelectedAllTags(updatedTags);
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        setSearchParams(params, { replace: true });

    };

    const handleSelC1 = (code) => {
        setSelC1(code);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value === "") {
            setSearchKeyword("");
            handlePageChange(1);
        }
    };

    const handleSearch = () => {
        setSearchKeyword(inputValue);
        handlePageChange(1);
    };

    const handleItemClick = (id, code) => {
        navigate(`/guide/gallery/detail?category=${code}&id=${id}`, {
            state: { id },
        });
    };

    const filteredData = tdata.filter(item => {
        const matchCategory = item.contentscd?.value === selC1;
        const matchKeyword =
            searchKeyword === "" ||
            item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.alltag?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.address?.toLowerCase().includes(searchKeyword.toLowerCase());

        const alltags = item.alltag?.split(/[,#]/).map(tag => tag.trim()).filter(Boolean) || [];

        const matchPopularTags = selectedPopularTags.every(tag => item.alltag?.includes(tag));
        const matchAllTags = selectedAllTags.every(tag => alltags.includes(tag));

        return matchCategory && matchKeyword && matchPopularTags && matchAllTags;
    });

    const sortedData = selectedPopularTags.length > 0
        ? [...filteredData].reverse().sort((a, b) => {
            const tag = selectedPopularTags[0];
            const aPriority = a.priority?.[tag] ?? 9999;
            const bPriority = b.priority?.[tag] ?? 9999;
            return aPriority - bPriority;
        })
        : [...filteredData].reverse().sort((a, b) => {
            const aHasPriority = a.priority ? 1 : 0;
            const bHasPriority = b.priority ? 1 : 0;
            return bHasPriority - aHasPriority;
        });

    const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const total = filteredData.length;
        const pagesCalc = Math.ceil(total / itemsPerPage);
        setTotalPages(pagesCalc || 1);
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
                        spaceBetween={20}
                        data={data.jejuCategory}
                        onClick={handleSelC1}
                        selTab={selC1}
                        tClass={` border-black`}
                        fClass={`!border-transparent`}
                        btnClass={`!rounded-none text-textBlack border-0 !border-b-2 !px-0 !py-1`}
                    />
                </div>

                {/* 선택된 태그 */}
                {[...selectedPopularTags, ...selectedAllTags].length > 0 && (
                    <div className="w-full flex gap-2 py-2 flex-wrap items-center pb-3">
                        {selectedPopularTags.map(tag => (
                            <span
                                key={`selected-pop-${tag}`}
                                className="inline-flex items-center bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full border border-yellow-300 cursor-pointer hover:bg-yellow-200"
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
                        currentPage={page} // 쿼리스트링에서 직접 가져온 page 값
                        totalPages={totalPages}
                        setCurrentPage={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default GuideGallery;
