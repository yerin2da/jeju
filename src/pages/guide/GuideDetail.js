import { useLocation, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GuideGalleryCard from "./GuideGalleryCard";
import GuideDetailCard from "./GuideDetailCard";
import Comment from "../../13paging/Comment";
import {ImSpinner2} from "react-icons/im";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export default function GuideDetail() {
    const location = useLocation();
    const [tdata, setTdata] = useState([])//전체 데이터
    const [isLoading, setIsLoading] = useState(true);
    const { cid,  category } = useParams();  // URL 파라미터로 cid 받기
    console.log("params category:", category);
    console.log("params cid:", cid);

    const id = location.state?.id || cid;  // state 없으면 cid 사용

    useEffect(() => {
        const getFetchData = async () => {
            try {
                const { data } = await axios.get(`${apiBaseUrl}/api/jeju-festival`, {
                    params: {
                        locale:"ko",
                        cid:id
                    },
                    headers: {
                        Accept: "application/json"
                    }
                });

                setTdata(data.items);
                console.log('상세 응답데이터 : ', data.items);

            } catch (error) {
                console.error('api응답 실패 :', error);
            }  finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        getFetchData();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600 transition-opacity duration-700 opacity-100 pointer-events-none">
                    <ImSpinner2 className="animate-spin text-3xl text-gray-600" />
                    <p>상세 정보를 불러오고 있어요</p>
                </div>
            ) : (
                <>
                    {tdata && tdata.length > 0 ? (
                        <>
                            {tdata.map((item) => (
                                <GuideDetailCard key={item.contentsid} item={item} />
                            ))}

                            <div className="py-2">
                                <Comment postId={cid} />
                            </div>
                        </>
                    ) : (
                        <p className="text-center py-10 text-gray-500">데이터가 없습니다.</p>
                    )}
                </>
            )}
        </div>
    );
}