import data from "../../db/data.json";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useRecoilState } from "recoil";
import {useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { pageState } from "../../store/noticeState";
import TabMenuSlider from "../../components/TabMenuSlider";
import SearchInput from "../../components/SearchInput";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";
import JejuThemeGalleryCard from "../../components/JejuThemeGalleryCard";

const JejuThemeGallery = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tdata, setTdata] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initCategory = queryParams.get("category") || 'family';

    const [selC1, setSelC1] = useState(initCategory);
    const [inputValue, setInputValue] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useRecoilState(pageState);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 4;
    const startIndex = (currentPage - 1) * itemsPerPage;

    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "family";
    const pageFromParams = parseInt(searchParams.get("page") || "1", 10);

    useEffect(() => {
        setCurrentPage(pageFromParams);
    }, [pageFromParams]);

    const handlePageChange = (page) => {
        setCurrentPage(page);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("category", selC1); // 현재 선택된 카테고리
        newParams.set("page", page);      // 새로운 페이지 번호
        setSearchParams(newParams);       // URL 갱신
    };

    const filteredData = tdata.filter(item => {
        const matchCategory = item.code === selC1;
        const matchKeyword =
            searchKeyword === "" ||
            item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.alltag?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            item.address?.toLowerCase().includes(searchKeyword.toLowerCase());
        return matchCategory && matchKeyword;
    });

    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    const getFetchAllData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.PUBLIC_URL}/db/all.json`);
            setTdata(data.theme || []);
        } catch (error) {
            console.error("전체 데이터 로딩 실패:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const currentCategory = category || 'family';
        setSelC1(currentCategory);
        getFetchAllData();
    }, [category]);

    const handleSelC1 = (code) => {
        setSelC1(code);
        setCurrentPage(1);

        const newParams = new URLSearchParams(searchParams);
        newParams.set("category", code);
        newParams.set("page", "1");
        setSearchParams(newParams); // URL 갱신

        getFetchAllData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    useEffect(() => {
        const total = filteredData.length;
        const pagesCalc = Math.ceil(total / itemsPerPage);
        setTotalPages(pagesCalc > 0 ? pagesCalc : 1);
    }, [filteredData]);

    return (
        <div>
            <div className="bg-white z-10 py-5">
                <div className={`pb-5`}>
                    <SearchInput
                        inputPlaceholder={`검색어를 입력해주세요`}
                        value={inputValue}
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                    />
                </div>
                <TabMenuSlider
                    spaceBetween={3}
                    data={data.jejuThemeCategory}
                    onClick={handleSelC1}
                    selTab={selC1}
                    tClass={`bg-mainColor text-white`}
                    fClass={`text-textBlack`}
                />
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600">
                    <ImSpinner2 className="animate-spin text-3xl" />
                    <p>테마별 관광지 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <>
                    {paginatedData.length !== 0 ? (
                        paginatedData.map((item, index) => (
                            <JejuThemeGalleryCard
                                key={`${item.code}-${index}`}
                                item={item}
                            />
                        ))
                    ) : (
                        <NoResult />
                    )}
                    <PaginationSimple
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default JejuThemeGallery;
