
import axios from "axios";
import React, {useEffect, useState} from "react";

import {ImSpinner2} from "react-icons/im";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";
import GalleryComponent from "../../components/GalleryComponent";
import ExhibiGalleryComponent from "../../components/ExhibiGalleryComponent";
import MusicGalleryComponent from "../../components/MusicGalleryComponent";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function MusicGallery() {
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
                .filter(item => item.dtype === "음악")

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
                    <p>음악회 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <>
                    {tdata && tdata.length > 0 ? (
                        <ul className="grid xs:grid-cols-2 gap-10 items-stretch">
                            {tdata.map((item, idx) => {

                                return (
                                    <li
                                        key={idx}
                                        className="h-full flex"
                                    >
                                        <MusicGalleryComponent
                                            item={{ ...item }}
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
