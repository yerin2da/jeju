
import axios from "axios";
import React, {useEffect, useState} from "react";

import {ImSpinner2} from "react-icons/im";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";
import GalleryComponent from "../../components/GalleryComponent";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function KorMusic() {
    const [tdata, setTdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    const [isLoading, setIsLoading] = useState(false);

    const getFetchData = async (pageNo = 1) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${process.env.PUBLIC_URL}/db/all.json`);
            const filteredData = (data.stage || [])
                .filter(item => item.dtype === "국악")

            const totalCount = filteredData.length;
            const startIndex = (pageNo - 1) * itemsPerPage;
            const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

            setTdata(paginatedData);
            setTotalPages(Math.ceil(totalCount / itemsPerPage));
        } catch (error) {
            console.error("❌ 프록시 API 에러 발생:", error);
            setTdata([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getFetchData(currentPage);
        console.log(currentPage)
    }, [currentPage]);


    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600 transition-opacity duration-700 opacity-100 pointer-events-none">
                    <ImSpinner2 className="animate-spin text-3xl text-gray-600" />
                    <p>국악 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <>
                    {tdata && tdata.length > 0 ? (
                        <ul className="grid grid-cols-2 gap-x-2 gap-y-6 items-stretch">
                            {tdata.map((item, idx) => {
                                const match = item.title.match(/\[(.*?)\]\s*(.*)/);// match[0]전체 일치한 문자열
                                const regionSort = match ? match[1] : "";// match[1]첫 번째 캡처 그룹 (지역명)
                                const title = match ? match[2] : item.title;// match[2]두 번째 캡처 그룹 (제목)
                                let region = "기타"; // 기본값은 기타
                                if (regionSort === "제주") {
                                    region = "제주";
                                } else if (regionSort === "제주 서귀포") {
                                    region = "서귀포";
                                }
                                return (
                                    <li
                                        key={idx}
                                        className="h-full flex"
                                    >
                                        <GalleryComponent
                                            item={{ ...item, title, region}}
                                            tit={`multi-ellipsis`}
                                            wrapClass={`!rounded-xl`}
                                            imgClass={``}
                                            region={region}
                                            regiClass={`bg-green-700 text-white rounded-br-xl text-xs font-semibold py-0.5 px-3`}
                                            tel="!hidden"
                                            date="hidden "
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <NoResult />
                    )}

                    {/* 페이지네이션은 항상 표시 */}
                    <PaginationSimple
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );


}
