import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AllSearchCard from "../../components/AllSearchCard";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export default function MainSearch() {
    const location = useLocation();
    const keyword = location.state?.keyword || '';

    const [tdata, setTdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getFetchData = async () => {
            if(!keyword) return;
            setIsLoading(true);

            try{
                const { data } = await axios.get(`${apiBaseUrl}/api/search`, {
                    params : {keyword}
                });
                setTdata(data);

            } catch(err) {
                console.error('검색에러:', err);
            } finally {
                setIsLoading(false);
            }
        };
        getFetchData();//호출

    },[keyword])

    return (
        <div className="px-4 py-6">
            {isLoading ? (
                <p>검색 중...</p>
            ) : tdata.length === 0 ? (
                <p className="text-gray-400">검색 결과가 없습니다.</p>
            ) : (
                <ul className="grid grid-cols-2 gap-2">
                    {tdata.some(item => item.source === 'festival') && (
                        <>
                            <li><p className="text-xl font-bold">제주 가이드</p></li>
                            {tdata
                                .filter(item => item.source === 'festival')
                                .map((item, idx) => (
                                    <li key={`festival-${idx}`}>
                                        <AllSearchCard item={item}/>
                                    </li>
                                ))}
                        </>
                    )}

                    {tdata.some(item => item.source === 'culture') && (
                        <>
                            <li><p className="text-xl font-bold">제주 테마여행</p></li>
                            {tdata
                                .filter(item => item.source === 'culture')
                                .map((item, idx) => (
                                    <li key={`culture-${idx}`}>
                                        <AllSearchCard item={item}/>
                                    </li>
                                ))}
                        </>
                    )}
                </ul>

            )}
        </div>
    );
};