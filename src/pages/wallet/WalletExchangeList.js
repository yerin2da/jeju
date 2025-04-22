import {LuClock} from "react-icons/lu";
import {FiMapPin} from "react-icons/fi";
import React, {useEffect, useState} from "react";
import axios from "axios";


const noticeList = [
    {
        id: 1,
        category: "exchangeList",
        title: "뀨",
        subtitle:"거래중",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "미국 달러",
        code: "USD",
        amount: "122,196",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    },
    {
        id: 2,
        category: "exchangeList",
        title: "뀨",
        subtitle:"거래완료",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "미국 달러",
        code: "USD",
        amount: "122,196",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    },
    {
        id: 3,
        category: "exchangeList",
        title: "뀨",
        subtitle:"거래중",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "미국 달러",
        code: "USD",
        amount: "122,196",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    },
    {
        id: 4,
        category: "exchangeList",
        title: "다정한7호선",
        subtitle:"거래완료",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
        name: "베트남 동",
        code: "VND",
        amount: "100,000,456",
        units: [
            {
                unit: 1,
                name: "1센트",
            },
            {
                unit: 2,
                name: "5센트",
            },
            {
                unit: 50,
                name: "10센트",
            },
            {
                unit: 100,
                name: "50센트",
            },
            {
                unit: 10000,
                name: "1달러",
            }
        ],
    },
];


const url = "";

export default function WalletExchangeList() {
    const [tdata, setTdata] = useState(noticeList); // 전체 데이터 (목록)

    //  3. 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url);
                console.log("응답 데이터 구조 확인:", data);
                setTdata(data);
            } catch (error) {
                console.warn("더미 데이터로 대체합니다.");
                setTdata(noticeList);
            }
        };

        fetchData();
    }, []);


    return (
        <div className={`p-5 bg-mainBg`}>
        {/* 글 목록 */}
            {tdata.map((item, idx) => {
                const isInProgress = item.subtitle === "거래중";

                return (
                    <>
                        <p className={`text-base pb-1 pt-4
                            ${isInProgress ? "text-mainColor" : "text-black"}`}
                        >
                            25.11.13(수) 오전 10:00
                        </p>

                        <div className={`contentsBox bg-white`}>

                            {/*거래중,거래완료*/}
                            <div className={`text-base text-white font-semibold text-center py-3 mb-6 -m-8 rounded-tl-xl rounded-tr-xl
                            ${isInProgress ? "bg-mainColor" : "bg-black"}`}
                            >
                                {isInProgress? "거래중": "거래완료"}
                            </div>

                            {/*흰색박스*/}
                            <div className={`flex flex-col items-center gap-y-5`}>

                                {/*상단*/}
                                <div className={`text-sm font-medium text-center text-gray-700`}>

                                    {/*거래상대 닉네임*/}
                                    <p>수수리님</p>
                                    {/* 화폐, 가격*/}
                                    <p className={``}>{item.name}<span className={`pl-2`}>KRW {item.amount}원</span></p>
                                </div>

                                {/* 회색선 박스 */}
                                <div className={`w-full p-3 xs:p-4 rounded-md border-l-[8px] border 
                                    ${isInProgress ? "border-l-[#7D4CD1]" : "border-l-gray-500"}`}
                                >
                                    <div className={`text-xs text-gray-500`}>
                                        {/*거래일시*/}
                                        <div className="flex items-start gap-2 pb-0.5">
                                            <p className={`flex items-center gap-1`}><LuClock/>거래일시</p>
                                            <p className={`flex-1`}>24.11.13(수) 오전 10:00</p>
                                        </div>

                                        {/*거래장소*/}
                                        <div className="flex items-start gap-2 pb-2">
                                            <p className={` flex items-center gap-1`}><FiMapPin/>거래장소</p>
                                            <p className={`flex-1`}>논현역 3번출구 앞 or 2번출구 앞</p>
                                        </div>

                                        {/*동전개수*/}
                                        {item.units && item.units.length > 0 && (
                                            <div className={`font-base`}>
                                                {item.units.map((unitItem, idx) => (
                                                    <span key={idx} className={`pr-4 whitespace-nowrap`}>
                                                {unitItem.name} {unitItem.unit}개
                                            </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
};