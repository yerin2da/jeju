import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AllSearchCard from "../../components/AllSearchCard";
import SearchCard from "../SearchCard";
import SectionTitle from "../../components/SectionTitle";


export default function AllSearch() {
    const location = useLocation();
    const keyword = location.state?.keyword || '';

    const [tdata, setTdata] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getFetchData = async () => {
            if(!keyword) return;
            setIsLoading(true);

            try{
                const { data } = await axios.get(`${process.env.PUBLIC_URL}/db/all.json`, {
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
        <div className="">
            {isLoading ? (
                <p>검색 중...</p>
            ) : tdata.length === 0 ? (
                <p className="text-gray-400">당신만의 여행 키워드를 입력해보세요</p>
            ) : (
                <div className={``}>

                    {/* 제주 가이드 */}
                    <div className={`border-b mb-5 pb-5`}>
                        <SectionTitle title="여행 가이드" />

                        {(tdata.guide?.filter(item => item.title?.includes(keyword)) || []).length === 0 ? (
                            <p className="text-gray-400">검색 결과가 없습니다.</p>
                        ) : (
                            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                                {tdata.guide
                                    .filter(item => item.title?.includes(keyword))
                                    .map(item => (
                                        <AllSearchCard key={item.title} item={item} />
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* 제주테마 */}
                    <div className={`border-b mb-5 pb-5`}>

                        <SectionTitle title="테마 여행" />

                        {tdata.theme?.filter(item => item.title?.includes(keyword)).length === 0 ? (
                            <p className="text-gray-400">검색 결과가 없습니다.</p>
                        ) : (
                            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                                {tdata.theme
                                    .filter(item => item.title?.includes(keyword))
                                    .map(item => (
                                        <AllSearchCard key={item.title} item={item} />
                                    ))}
                            </div>
                        )}
                    </div>


                    {/* 제주 스테이지 */}
                    <SectionTitle title="무대 공연" />

                    {(tdata.stage?.filter(item => item.title?.includes(keyword)) || []).length === 0 ? (
                    <p className="text-gray-400">검색 결과가 없습니다.</p>
                    ) : (
                        <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                            {tdata.stage
                                .filter(item => item.title?.includes(keyword))
                                .map(item => (
                                    <AllSearchCard key={item.title} item={item} />
                                ))}
                        </div>
                    )}
                </div>


            )}
        </div>
    );
};