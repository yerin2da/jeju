import {useEffect,  useState} from "react";
import TailButton from "../UI/TailButton";
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from "axios";
import 'swiper/css';
import { FaCoins } from "react-icons/fa";
import {GiMoneyStack} from "react-icons/gi";
import {currencyAtom} from "../recoil/atoms";
import {useRecoilState, useResetRecoilState} from "recoil";
import {formatNumber, formatNumber2} from '../utils/formatNumber';

// import data from "../db/data.json";
import Select from "react-select";
import {LuCirclePlus} from "react-icons/lu";

export default function CountrySelOption() {
    const [currencyData, setCurrencyData] = useRecoilState(currencyAtom);//화폐 옵션 선택
    const { selC1, selC2, count } = currencyData;//필요한 값을 꺼내 씀

    const [tdata, setTdata] = useState([]);//대륙데이터
    const [selectedCountry, setSelectedCountry] = useState(null)//국가선택
    const [selectedUnit, setSelectedUnit] = useState([]);//화폐 유닛선택

    const apiKey = process.env.REACT_APP_API_BASE_URL;
    const urlContinent = `${apiKey}/Trade/continent?continent=${selC1}`;
    const urlUnit = `${apiKey}/Trade/money?code=${selC2}`;

    // 각 atom에 대해 초기화 함수 선언
    const resetCurrency = useResetRecoilState(currencyAtom);//화폐옵션

    // 컴포넌트 마운트 시 초기화
    useEffect(() => {
        // 마운트 시 초기화
        resetCurrency();
    }, []);

    //대륙 선택
    useEffect(() => {
        if (!selC1) return;
        const fetchData = async () => {
            try {
                const { data } = await axios.get(urlContinent, {timeout : 5000});//5초
                if (data.result === "success") {
                    console.log("대륙, 국가 응답 데이터", data);
                    setTdata(data.code);

                } else {
                    console.error(data.msg || "요청 실패");
                }
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    console.error('요청 시간이 초과되었습니다!');
                    alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    console.error("API 요청 에러:", error);
                    alert("서버 오류가 발생했습니다.");
                }
            }
        };
        fetchData();
    }, [selC1]);


    // 화폐 유닛 선택
    useEffect(() => {
        if (!selC2) {
            setSelectedCountry([]);
            return;
        }

        const fetchCountryDetail = async () => {
            try {
                const { data } = await axios.get(urlUnit, {timeout : 5000});//5초
                if (data.result === "success") {
                    console.log("화폐 유닛 응답 데이터", data);

                    const { money_type, exchange } = data.code;
                    setSelectedCountry({ money_type, exchange });
                } else {
                    console.error(data.msg || "국가 상세 요청 실패");
                }
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    console.error('요청 시간이 초과되었습니다!');
                    alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
                } else {
                    console.error("API 요청 에러:", error);
                    alert("서버 오류가 발생했습니다.");
                }
            }
        };

        fetchCountryDetail();
    }, [selC2]);


    // 대륙 선택시
    const handleSelC1 = (newC1) => {
        setCurrencyData({
            selC1: newC1,
            selC2: "",//선택된 국가 초기화
            count: {},//화폐 선택
        });
    };

    // 국가 선택시
    const handleSelC2 = (newC2) => {
        setCurrencyData({
            selC1,
            selC2: newC2,
            count: {},//화폐 선택 초기화
        });
    };

    // 대륙, 국가 바뀔때마다 화폐셀렉트 초기화
    useEffect(() => {
        // 국가가 바뀔 때마다 선택된 화폐 유닛도 초기화
        setSelectedUnit([]);
    }, [selC1, selC2]);

    // 화폐 개수 증가/감소
    const handleCountChange = (monenyIdx, change) => {
        const newCount = {
            ...count,
            [monenyIdx]: Math.max(0, (count[monenyIdx] ?? 0) + change),//[monenyIdx]:바꾸려는 화폐 권종의 ID
        };

        //화폐 수량이 변경된 후, 해당 수량 정보를 업데이트
        updateCurrencyInfo(newCount);
    };

    //권종, 수량 체크
    const updateCurrencyInfo = (newCount) => {
        const trade_currency_type_idx = [];
        const curency_count = [];

        for (const [monenyIdx, cnt] of Object.entries(newCount)) {
            if (cnt > 0) {//수량이 0보다 큰 경우
                trade_currency_type_idx.push(Number(monenyIdx));//숫자로 변환 후 저장
                curency_count.push(cnt);//배열에 추가
            }
        }

        const isoCode = selectedCountry?.money_type?.[0]?.code;//선택된 국가의 첫 번째 권종의 통화코드(예: USD)

        setCurrencyData({
            selC1,
            selC2,
            count: newCount,
            isoCode,
            trade_currency_type_idx,
            curency_count,
        });
    };

    // 대륙 셀렉트 박스
    const continentOptions = data.continent.map(({ code, label }) => ({
        value: code,
        label: <span className="text-sm">{label}</span>,
    }));

    // 국가 셀렉트 박스
    const countryOptions = tdata.map((item) => ({
        value: item.code,
        label: (
            <div className="flex items-center gap-2">
                <img
                    src={`/img/${item.code}.png`}
                    alt={item.code}
                    className="w-5 border"
                />
                <span className={`text-sm`}>{item.name}</span>
            </div>
        )
    }));

    // 화폐 유닛 셀렉트
    const unitOptions = selectedCountry?.money_type?.map((unit) => ({
        value: unit.moneny_idx,
        label: (
            <div className="flex items-center gap-2">
                {unit.coin === "N" ? (
                    <GiMoneyStack className="text-green-400 text-base" />
                ) : (
                    <FaCoins className="text-yellow-500 text-sm" />
                )}
                <span className={`text-xs font-normal`}>{unit.shown}</span>
            </div>
        ),
        data: unit // 원본 객체 보관
    })) ?? [];

    // 권종 추가버튼
    const handleUnitRegister = () =>{
        if (selectedUnit.length >= unitOptions.length) return;//권종 개수만큼만 권종 추가 가능

        setSelectedUnit(prev => [...prev, { money_idx:"", unit:null } ]);
    }

    // 국가 선택되면 권종선택 1개 먼저 보여주기
    useEffect(() => {
        if (selectedCountry?.money_type?.length > 0) {
            setSelectedUnit([{ money_idx: "", unit: null }]);
        }
    }, [selectedCountry]);

    // KRW 합계
    const totalAmount = formatNumber(
        Math.round(
            selectedUnit.reduce((sum, item) => {
                const unit = unitOptions.find(opt => opt.value === item.moneny_idx)?.data;
                const cnt = count[item.moneny_idx] ?? 0;
                const rate = selectedCountry?.exchange?.exchange ?? 0;
                return unit && rate ? sum + (cnt * unit.price * rate) : sum;
            }, 0)
        )
    );


    return (
        <div className="text-sm contentsBox !p-3 border border-[#f9f9f9]">

            <div className="space-y-2">
                {/* 대륙 선택 */}
                <Select
                    options={continentOptions}
                    value={continentOptions.find(opt => opt.value === selC1)}
                    onChange={(option) => handleSelC1(option.value)}
                    isSearchable={false}
                    classNamePrefix="rs"
                />

                {/* 국가 선택 */}
                <Select
                    options={countryOptions}
                    value={
                        selC2 ? countryOptions.find(opt => opt.value === selC2) : null
                    }
                    onChange={(option) => handleSelC2(option.value)}
                    isSearchable={false}
                    placeholder="나라를 선택해주세요"
                    classNamePrefix="rs"
                />

                {/* 환율정보 */}
                <input
                    type="text"
                    value={
                        selC2 && selectedCountry?.exchange ?
                            `${tdata.find(item => item.code === selC2)?.name ?? ""} 환율 ${selectedCountry?.exchange.exchange}`
                            : "-"
                        //배열은 find로 찾고 객체는 .으로 찾는 듯
                    }
                    className={`w-full bg-lightPurple !border-transparent text-subColor2 pl-4`}
                    readOnly
                    disabled
                />
            </div>

            {/* 화폐 유닛 선택 */}
            {selC2 && selectedCountry?.money_type && (
                <div className={`pt-6`}>
                    <div className={`space-y-2 flex flex-col border-b border-b-black  pb-4`}>

                        {selectedUnit.map((item, idx) => {
                            const monenyIdx = item.moneny_idx;
                            const cnt = count[monenyIdx] ?? 0;
                            const unit = unitOptions.find(opt => opt.value === item.moneny_idx)?.data;
                            const rate = selectedCountry?.exchange?.exchange ?? 0;

                            return (
                                <div key={idx}
                                     className="flex justify-between items-center gap-2 pb-2">
                                    {/* 권종 선택 */}
                                    <div className="flex items-center gap-2">

                                        <select
                                            value={monenyIdx || ""}
                                            onChange={(e) => {
                                                const selectedIdx = e.target.value;
                                                const selected = unitOptions.find(opt => opt.value === selectedIdx);
                                                if (!selected) return;

                                                const updated = [...selectedUnit];
                                                updated[idx] = {
                                                    moneny_idx: selected.value,
                                                    price: selected.data.price,
                                                    ...selected.data
                                                };
                                                setSelectedUnit(updated);

                                                const newCount = {
                                                    ...count,
                                                    [selected.value]: 0
                                                };
                                                updateCurrencyInfo(newCount);
                                            }}
                                            className="w-fit h-8 px-2 rounded text-sm"
                                        >
                                            <option value="" disabled>권종 선택</option>
                                            {unitOptions.map((opt) => {
                                                const u = opt.data;
                                                return (
                                                    <option key={opt.value} value={opt.value}>
                                                        {u.coin === "N" ? "💵" : "🪙"} {u.shown}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    {/* 수량 조절 */}
                                    <div className="flex items-center gap-2 bg-gray-100 px-1 rounded text-xs">
                                        <TailButton
                                            caption={<FiMinus/>}
                                            bcolor="text-black"
                                            disabled={cnt === 0 || !monenyIdx}
                                            handleClick={() => handleCountChange(monenyIdx, -1)}
                                        />
                                        <input
                                            type="text"
                                            min="0"
                                            value={cnt}
                                            className="w-8 h-8 text-center !bg-gray-100 !border-none"
                                            onChange={(e) => {
                                                const newValue = parseInt(e.target.value, 10);
                                                if (!isNaN(newValue)) {
                                                    handleCountChange(monenyIdx, newValue - cnt);
                                                } else {
                                                    handleCountChange(monenyIdx, -cnt);
                                                }
                                            }}
                                            onFocus={(e) => e.target.select()}
                                        />
                                        <TailButton
                                            caption={<FiPlus/>}
                                            bcolor="text-black"
                                            disabled={!monenyIdx}
                                            handleClick={() => handleCountChange(monenyIdx, +1)}
                                        />
                                    </div>

                                    {/* 금액 계산 */}
                                    <span className="text-sm text-textDarkGray flex-1 text-right">
                                        {unit && selectedCountry?.exchange?.exchange
                                            ? `${formatNumber(Math.round(cnt * unit.price * rate))} KRW`
                                            : "0 KRW"}
                                    </span>

                                </div>
                            );
                        })}

                        {/*권종 추가하기 버튼*/}
                        <LuCirclePlus
                            size={24}
                            onClick={handleUnitRegister}
                            className={`self-center text-textDarkGray ${selectedUnit.length < unitOptions.length ? "visible" : "hidden"}`}
                        />
                    </div>

                    <div className={`flex justify-between items-center text-lg py-4 font-semibold px-3`}>
                        <p>합계</p>
                        <p>{totalAmount} 원</p>
                    </div>
                    <div className={`text-base bg-subColor2 text-white font-semibold text-center py-3 mt-3 -m-3 rounded-bl-xl rounded-br-xl`}

                    > 저장하기</div>
                </div>

            )}


        </div>
    );
    }
