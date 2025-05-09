// import {useEffect,  useState} from "react";
// import IconImage from "../components/IconImage";
// import TailButton from "../UI/TailButton";
// import { FiPlus, FiMinus } from "react-icons/fi";
// import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';
// import { Pagination } from "swiper/modules";
// import { FaCoins } from "react-icons/fa";
// import {GiMoneyStack} from "react-icons/gi";
// import {currencyAtom} from "../recoil/atoms";
// import {useRecoilState} from "recoil";
// import {formatNumber, formatNumber2} from '../utils/formatNumber';
//
// // import data from "../db/data.json";
// import TabMenuSlider from "./TabMenuSlider";
//
//
// export default function CountrySelTab() {
//     const [currencyData, setCurrencyData] = useRecoilState(currencyAtom);//화폐 옵션 선택
//     const { selC1, selC2, count } = currencyData;//필요한 값을 꺼내 씀
//
//     const [tdata, setTdata] = useState([]);
//
//     const apiKey = process.env.REACT_APP_API_BASE_URL;
//     const urlContinent = `${apiKey}/Trade/continent?continent=${selC1}`;
//     const urlUnit = `${apiKey}/Trade/money?code=${selC2}`;
//
//     // 대륙 선택시
//     const handleSelC1 = (newC1) => {
//         setCurrencyData({
//             selC1: newC1,
//             selC2: null,//선택된 국가 초기화
//             count: {},//화폐 선택
//         });
//     };
//
//     // 국가 선택시
//     const handleSelC2 = (newC2) => {
//         setCurrencyData({
//             selC1,//대륙 초기화
//             selC2: newC2,
//             count: {},//화폐 선택 초기화
//         });
//     };
//
//     // 국가 슬라이드
//     const [groupedRates, setGroupedRates] = useState([]);
//
//     useEffect(() => {
//         const getGroupSize = () => {
//             const width = window.innerWidth;
//             if (width < 480) return 8; //
//             if (width < 640) return 9; //
//             if (width < 768) return 12; //
//             if (width < 1024) return 12; //
//             return 15; //
//         };
//
//         const size = getGroupSize();
//         const newGroups = [];
//         for (let i = 0; i < tdata.length; i += size) {
//             newGroups.push(tdata.slice(i, i + size));
//         }
//         setGroupedRates(newGroups);
//     }, [tdata]);
//
//     // 화폐 개수 증가/감소
//     const handleCountChange = (monenyIdx, change) => {
//         const newCount = {
//             ...count,
//             [monenyIdx]: Math.max(0, (count[monenyIdx] ?? 0) + change),//[monenyIdx]:바꾸려는 화폐 권종의 ID
//         };
//
//         //화폐 수량이 변경된 후, 해당 수량 정보를 업데이트
//         updateCurrencyInfo(newCount);
//     };
//
//     //권종, 수량 체크
//     const updateCurrencyInfo = (newCount) => {
//         const trade_currency_type_idx = [];
//         const curency_count = [];
//
//         for (const [monenyIdx, cnt] of Object.entries(newCount)) {
//             if (cnt > 0) {//수량이 0보다 큰 경우
//                 trade_currency_type_idx.push(Number(monenyIdx));//숫자로 변환 후 저장
//                 curency_count.push(cnt);//배열에 추가
//             }
//         }
//
//         const isoCode = selectedCountry?.money_type?.[0]?.code;//선택된 국가의 첫 번째 권종의 통화코드(예: USD)
//
//         setCurrencyData({
//             selC1,
//             selC2,
//             count: newCount,
//             isoCode,
//             trade_currency_type_idx,
//             curency_count,
//         });
//     };
//
//     //대륙 선택
//     useEffect(() => {
//         if (!selC1) return;
//         const fetchData = async () => {
//             try {
//                 const { data } = await axios.get(urlContinent);
//                 if (data.result === "success") {
//                     setTdata(data.code);
//                 } else {
//                     console.error(data.msg || "요청 실패");
//                 }
//             } catch (err) {
//                 console.error("API 에러:", err);
//             }
//         };
//         fetchData();
//     }, [selC1]);
//
//
//     // 화폐 유닛 선택
//     const [selectedCountry, setSelectedCountry] = useState(null)
//     useEffect(() => {
//         if (!selC2) {
//             setSelectedCountry(null);
//             return;
//         }
//
//         const fetchCountryDetail = async () => {
//             try {
//                 const { data } = await axios.get(urlUnit);
//                 if (data.result === "success") {
//                     const { money_type, exchange } = data.code;
//                     setSelectedCountry({ money_type, exchange });
//                 } else {
//                     console.error(data.msg || "국가 상세 요청 실패");
//                 }
//             } catch (err) {
//                 console.error("국가 상세 API 에러:", err);
//             }
//         };
//
//         fetchCountryDetail();
//     }, [selC2]);
//
//     return (
//         <div className="text-sm">
//
//             {/* 대륙 선택 탭메뉴 */}
//             <div className="pb-3 -mr-8">
//                 <TabMenuSlider
//                     spaceBetween={3}
//                     data={data.continent}
//                     onClick={handleSelC1}
//                     selTab={selC1}
//                     tClass={`bg-black text-white`}
//                     fClass={`bg-white text-textDarkGray border border-textLightGray`}
//                 />
//             </div>
//
//             {/* 국가 선택 */}
//                 <Swiper
//                     modules={[Pagination]}
//                     pagination={{
//                         clickable: true,
//                     }}
//                     style={{ width: "100%", height: "fit-content", paddingBottom:"30px"}} // Swiper 크기 조정
//                 >
//                 {groupedRates.map((group, index) => (
//                     <SwiperSlide
//                         key={index}
//                         style={{ width: '100%' }}
//                     >
//                         <div className="grid grid-cols-2 gap-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5"> {/*  배치 */}
//                             {group.map((item) => (
//                                 <button
//                                     key={item.code}
//                                     className={`h-[104px] border px-4 py-3 sm:py-4 lg:py-6 rounded-lg flex flex-col justify-center items-center text-center ${
//                                         selC2 === item.code
//                                             ? "bg-lightPurple border-subColor2"
//                                             : "bg-white border-textLightGray"
//                                     }`}
//                                     onClick={() => handleSelC2(item.code)}
//                                 >
//                                     <IconImage
//                                         imageSrc={`/img/${item.code}.png`}
//                                         title="국기"
//                                         className="w-5 mb-1 border border-gray-100"
//                                     />
//                                     <p className="text-gray break-keep">{item.name}</p>
//                                     <p className="text-gray text-xs">({item.code})</p>
//                                 </button>
//                             ))}
//                         </div>
//                     </SwiperSlide>
//                 ))}
//                 </Swiper>
//
//             {/* 화폐 유닛 선택 */}
//             {selectedCountry?.money_type?.length > 0 && (
//                 <ul>
//                     {selectedCountry.money_type.map((unit) => {
//                         const monenyIdx = unit.moneny_idx;
//                         const cnt = count[monenyIdx] ?? 0;
//                         const selectedCountryItem = tdata.find(c => c.code === selC2);
//                         const rate = selectedCountry?.exchange?.exchange ?? 0;
//
//                         return (
//                             <li key={monenyIdx} className="mb-4 border rounded-xl p-4 border-textLightGray">
//                                 <div className="flex justify-between items-center mb-3">
//                                     <p className="font324223-semibold flex items-center gap-1">
//                                         {unit.coin === "N"
//                                             ? "💵"
//                                             : "🪙"
//                                         }
//                                         {unit.shown}
//                                     </p>
//
//                                     {/* +- 버튼 */}
//                                     <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
//                                         <TailButton
//                                             caption={<FiMinus/>}
//                                             bcolor="text-black"
//                                             disabled={cnt === 0}
//                                             handleClick={() => handleCountChange(monenyIdx, -1)}
//                                         />
//                                         <input
//                                             type="text"
//                                             min="0"
//                                             value={cnt}
//                                             className="w-12 h-8 text-center bg-white px-3 py-0.5 rounded"
//                                             onChange={(e) => {
//                                                 const newValue = parseInt(e.target.value, 10);//parseInt:숫자변환
//                                                 if (!isNaN(newValue)) {//숫자가 맞으면
//                                                     handleCountChange(monenyIdx, newValue - cnt);//입력값 - 기존 값
//                                                 } else {
//                                                     handleCountChange(monenyIdx, -cnt); // 숫자 아님이면 0으로 초기화
//                                                 }
//                                             }}
//                                             onFocus={(e) => {
//                                                 e.target.select(); // 포커스 시 전체 선택
//                                             }}
//                                         />
//
//                                         <TailButton
//                                             caption={<FiPlus/>}
//                                             bcolor="text-black"
//                                             handleClick={() => handleCountChange(monenyIdx, +1)}
//                                         />
//                                     </div>
//                                 </div>
//
//                                 {/* 금액 계산 */}
//                                 <div className="text-sm space-y-1 text-textDarkGray">
//                                     <div className="flex justify-between">
//                                         <span className="inline-block w-32 xs:w-60 break-keep">
//                                             {selectedCountryItem?.name}
//                                         </span>
//                                         <span className={`xs:whitespace-nowrap`}>{
//                                                 formatNumber2(
//                                                     Number(//숫자로 변환
//                                                         (cnt * unit.price).toFixed(2)//문자열
//                                                     )
//                                                 )
//                                             } {unit.code}
//                                         </span>
//                                     </div>
//                                     <div className="flex justify-between">
//                                         <span>대한민국 원</span>
//                                         <span> {formatNumber(Math.round(cnt * unit.price * rate))} KRW</span>
//                                     </div>
//                                 </div>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             )}
//         </div>
//     );
// }
