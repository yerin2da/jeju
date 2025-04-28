import { useLocation, useParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import GuideGalleryCard from "./GuideGalleryCard";
import GuideDetailCard from "./GuideDetailCard";
import Comment from "../../13paging/Comment";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL_KOYEB;

export default function GuideDetail() {
    const location = useLocation();
    const [tdata, setTdata] = useState([])//전체 데이터

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
            }
        };

        getFetchData();
    }, []);

    return (
        <div>
            {tdata && tdata.length > 0 ? (
                <>
                    {tdata.map(item => (
                        <GuideDetailCard key={item.contentsid} item={item}/>
                    ))}

                    <div className={`py-2`}>
                        <Comment postId={cid}/>
                    </div>

                </>
            ) : (
                <p>데이터가 없습니다.</p>
            )}

        </div>

    );
}
