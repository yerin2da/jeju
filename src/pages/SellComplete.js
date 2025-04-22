import IconImage from "../components/IconImage";
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5";
import {useEffect, useState} from "react";
import axios from "axios";
import { formatNumber2 } from '../utils/formatNumber';


const dummyData = {
    currency: {
        code: "USD",                          // 통화 코드
        name: "미국 달러",                    // 화폐 이름
        symbol: "$",                          // 심볼
        image: "/img/USD.png",                // 국기 이미지 경로
        country: "미국",                      // 국가 이름
        rate: 1434.32,                       // 현재 환율
        rateDiff: -6.99,                     // 전일 대비 등락폭
        rateDiffType: "down",                // 상승(up) or 하락(down)
        date: "2025.02.14(금)",               // 환율 기준일자
    },
    coins: [
        {
            unit: 0.01,                         // 단위 값
            name: "1센트",                      // 동전 이름
            quantity: 20,                      // 개수
            pricePerUnit: 200.33,             // 동전 당 원화 가격
            total: 100,                        // 전체 원화 환산 금액
        },
        {
            unit: 0.05,
            name: "5센트",
            quantity: 22390,
            pricePerUnit: 100434.32,
            total: 100286.86,
        },
        {
            unit: 1.00,
            name: "1달러",
            quantity: 2,
            pricePerUnit: 11.16,
            total: 22.32,
        },
    ],
    totalAmount: 4.20,                         // 전체 외화 합계
    totalKRW: 4589.80                      // 예상 원화 환산 금액
};

export default function SellComplete() {

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
    const {currency, coins, totalAmount, totalKRW} = tdata;

    //상승, 하락 아이콘 변경
    const rateDiffIcon =
        currency.rateDiffType === "down" ?(
            <IoCaretDownOutline className={`text-xl`} />
        ):(
            <IoCaretUpOutline className={`text-xl`} />
        );

    return (
        <div className={` w-full px-5 flex flex-col items-center justify-center`}>
            <div className={`flex flex-col items-center pb-14`}>
                <IconImage
                    imageSrc={currency.image}
                    className={`pb-4 w-24`}
                    title={currency.country + "국기"}
                />
                <p className={`text-xl font-bold`}>동전 등록 완료</p>
            </div>

            <div className={`w-full border border-midPurple rounded-lg text-sm `}>
                <div className={`flex flex-col items-center justify-center w-full py-6 px-4 bg-white font-semibold overflow-hidden`}>
                    <div
                        className={`border border-subColor2 rounded-full text-subColor2 px-4 py-1 mb-6`}>
                        {currency.name + "(" + currency.code + ")"}
                    </div>

                    <p className={`text-subColor2 pb-4 flex items-center font-medium`}>신청일 {currency.date} 환율 {formatNumber2(currency.rate)}
                        <span className={`flex items-center pl-2 font-normal ${
                            currency.rateDiffType === "down" ? "text-blue-600" : "text-red-600"
                        }`}
                        >{rateDiffIcon}{currency.rateDiff}</span>
                    </p>

                    <div className="w-full overflow-auto max-h-[400px] flex items-center justify-center">
                        <ul className={` text-xs flex flex-col items-start`}>
                            {coins.map((coin, idx) => (
                                <li key={idx}
                                    className={` flex gap-1 items-start justify-start pb-2 font-normal `}
                                >
                                    <p className={`whitespace-nowrap bg-midPurple text-subColor2 px-2.5 py-1 mr-2 rounded text-center`}>{coin.name} {coin.quantity}개</p>
                                    <p className={`break-words text-textDarkGray text-xs`}>{currency.symbol}{formatNumber2(coin.unit)} x {formatNumber2(coin.pricePerUnit)} KRW
                                        -> {formatNumber2(coin.total)} KRW
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className={`w-full bg-textBlack h-20 text-white text-md p-4`}>
                    <div className={`flex items-center justify-between pb-1`}>
                        <p>총합{`(${currency.code})`}</p>
                        <p>{`${currency.symbol}${formatNumber2(totalAmount)}`}</p>
                    </div>
                    <div className={`flex items-center justify-between`}>
                        <p>예상 원화</p>
                        <p>{formatNumber2(totalKRW)}원</p>
                    </div>
                </div>

            </div>
        </div>
    );
};