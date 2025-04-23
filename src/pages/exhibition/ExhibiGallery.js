
import axios from "axios";
import React, {useEffect, useState} from "react";

import {ImSpinner2} from "react-icons/im";
import NoResult from "../../components/NoResult";
import PaginationSimple from "../../components/PaginationSimple";
import GalleryComponent from "../../components/GalleryComponent";
import ExhibiGalleryComponent from "../../components/ExhibiGalleryComponent";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function ExhibiGallery() {
    const [tdata, setTdata] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 10;

    const [isLoading, setIsLoading] = useState(false);
    const cultureApiBaseUrl = 'http://api.kcisa.kr/openapi/CNV_060/request';


    const getFetchData = async (pageNo = 1) => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(cultureApiBaseUrl, {
                params: {
                    serviceKey: process.env.REACT_APP_API_BASE_URL,
                    pageNo,
                    numOfRows: itemsPerPage,
                    dtype: "전시",
                    title: "제주",
                    type: "json"
                },
                headers: {
                    Accept: "application/json"
                }
            });

            console.log("✅ API 응답:", data);

            const items = data.response?.body?.items?.item || [];
            setTdata(items);


            const totalCount = 50;
            const pages = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(pages);

        } catch (error) {
            console.error("❌ 프록시 API 에러 발생:", error);
            setTdata([]);
        } finally{
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
                    <p>전시 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <div>
                    {tdata && tdata.length > 0 ? (
                        <ul className={`xs:grid grid-cols-2 gap-2 items-stretch`}>
                            {tdata.map((item, idx) => (
                            <li key={idx}
                                className="h-full flex"
                            >
                                <ExhibiGalleryComponent
                                    item={item}
                                    tit={`multi-ellipsis2`}
                                />
                            </li>
                            ))}
                        </ul>

                    ) : (
                        <NoResult/>
                    )}

                    {/* 페이지네이션 */}
                    <PaginationSimple
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                )}
        </div>
    );

    }
