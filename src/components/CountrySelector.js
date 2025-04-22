import { useState, useEffect } from "react";
import IconImage from "../components/IconImage";
import TailButton from "../UI/TailButton";
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";

const dummyData = [
    {
        code: "USD",
        name: "미국 달러",
        symbol: "$",
        unitAmount: 1.0,
        units: [
            {
                unit: 0.01,
                name: "1센트",
            },
            {
                unit: 0.05,
                name: "5센트",
            },
            {
                unit: 0.10,
                name: "10센트",
            },
            {
                unit: 0.50,
                name: "50센트",
            },
            {
                unit: 1.0,
                name: "1달러",
            }
        ],
        image: "/img/USD.png",
        categories: ["전체", "글로벌"],
        country: "미국"
    },
    {
        code: "CNY",
        name: "중국 위안",
        symbol: "¥",
        unitAmount: 1.0,
        units: [],
        image: "/img/CNY.png",
        categories: ["전체", "글로벌", "아시아"],
        country: "중국"
    },
    {
        code: "KRW",
        name: "대한민국 원",
        symbol: "₩",
        unitAmount: 1000.0,
        units: [],
        image: "/img/KRW.png",
        categories: ["전체", "아시아"],
        country: "대한민국"
    },
    {
        code: "JPY",
        name: "일본 엔",
        symbol: "¥",
        unitAmount: 100.0,
        units: [],
        image: "/img/JPY.png",
        categories: ["전체", "글로벌", "아시아"],
        country: "일본"
    },
    {
        code: "BRL",
        name: "브라질 레알",
        symbol: "R$",
        unitAmount: 1.0,
        units: [],
        image: "/img/BRL.png",
        categories: ["전체", "기타"],
        country: "브라질"
    },
    {
        code: "EUR",
        name: "유럽 유로",
        symbol: "€",
        unitAmount: 1.0,
        units: [],
        image: "/img/EUR.png",
        categories: ["전체", "글로벌"],
        country: "유럽연합"
    }
];

export default function CountrySelector({ selC1, setSelC1, selC2, setSelC2, count, setCount }) {
    // ✅ 포맷터 함수: 소수점 둘째 자리 + 천단위 콤마
    const formatNumber = (num, decimalPlaces = 2) => {
        return num.toLocaleString(undefined, {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
    };

    const url = "";
    const [tdata, setTdata] = useState(dummyData);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url);
                setTdata(data);
            } catch (error) {
                console.warn("백엔드 데이터를 가져오지 못했습니다. 더미 데이터 사용.");
            }
        };
        fetchData();
    }, []);

    // 하드코딩으로 간단하게 카테고리 작성
    const categories = ["전체", "글로벌", "아시아", "기타"];

    const selectedCurrencies = tdata.filter(item => item.categories.includes(selC1));

    const selectedCurrency = selectedCurrencies.find(item => item.code === selC2) || null;

    const handleUp = (index) => {
        setCount(prev => ({
            ...prev,
            [index]: (prev[index] ?? 0) + 1
        }));
    };

    const handleDown = (index) => {
        setCount(prev => ({
            ...prev,
            [index]: Math.max(0, (prev[index] ?? 0) - 1)
        }));
    };

    return (
        <div className="text-sm">
            {/* 대분류 탭 */}
            <div className="w-full flex flex-1 justify-between gap-2 items-center pb-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`w-full px-2 rounded-2xl h-8 border ${
                            selC1 === category
                                ? "bg-black text-white"
                                : "bg-white text-textDarkGray border-textLightGray"
                        }`}
                        onClick={() => setSelC1(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* 중분류 (국가 선택) */}
            <div className="text-xs xs:text-sm w-full grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6">
                {selectedCurrencies.map((item) => (
                    <button
                        key={item.code}
                        className={`border px-2 py-2.5 rounded-lg flex flex-col items-center ${
                            selC2 === item.code
                                ? "bg-lightPurple border-subColor2"
                                : "bg-white border-textLightGray"
                        }`}
                        onClick={() => setSelC2(item.code)}
                    >
                        <IconImage
                            imageSrc={item.image}
                            title={item.name}
                            className="w-5 mb-1 border border-gray-100"
                        />
                        <p className="text-gray">{item.name}</p>
                        <p className="text-gray text-xs">({item.code})</p>
                    </button>
                ))}
            </div>

            {/* 화폐 개수 선택 */}
            {selectedCurrency && selectedCurrency.units.length > 0 && (
                <div className="mt-3 text-center">
                    <ul>
                        {selectedCurrency.units.map((unitItem, index) => (
                            <li
                                key={index}
                                className="mt-2 flex flex-col items-start px-2 py-4 border border-textLightGray rounded-xl"
                            >
                                <div className="w-full px-2 pb-3 flex items-center justify-between">
                                    <p className="font-semibold">{unitItem.name}</p>


                                    <div className="w-24 px-2 py-1 rounded flex gap-1 items-center justify-around bg-midGray">
                                        <TailButton
                                            caption={<FiMinus />}
                                            bcolor="text-black"
                                            disabled={(count[index] ?? 0) === 0}
                                            handleClick={() => handleDown(index)}
                                        />
                                        <p className="bg-white py-0.5 px-2 rounded text-textGray overflow-hidden">
                                            {count[index] ?? 0}
                                        </p>
                                        <TailButton
                                            caption={<FiPlus />}
                                            bcolor="text-black"
                                            handleClick={() => handleUp(index)}
                                        />
                                    </div>
                                </div>

                                <div className="w-full h-[1px] bg-textLightGray mb-3"></div>

                                <div className="text-xs xs:text-sm w-full px-2 flex flex-col items-start justify-center text-textDarkGray">
                                    <div className="w-full pb-1 flex items-center justify-between">
                                        <div>
                                            {selectedCurrency.name}({selectedCurrency.code}):
                                        </div>
                                        <div>
                                            {selectedCurrency.symbol}
                                            {formatNumber((count[index] ?? 0) * unitItem.unit)}  {/*undefined일 경우 기본값 0*/}
                                        </div>
                                    </div>

                                    <div className="w-full flex items-center justify-between">
                                        <div>대한민국 원(KRW):</div>
                                        <div>₩{formatNumber("값")}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
