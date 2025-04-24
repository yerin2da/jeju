import { useLocation, useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

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
                tdata.map(item => (
                    <div key={item.contentsid}>
                        <h1>{item.title}</h1>
                        <p>{item.alltag}</p>
                    </div>
                ))
            ) : (
                <p>데이터가 없습니다.</p>
            )}
        </div>

    );
}
