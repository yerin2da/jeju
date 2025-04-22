// import InfoComponent from "../components/InfoComponent";
// import SectionTitle from "./components/SectionTitle";
// import {useLocation, useNavigate} from "react-router-dom";
// import InfoComponent2 from "./components/InfoComponent2";
// import axios from "axios";
// import {useEffect, useState} from "react";
//
// const apiKey = process.env.REACT_APP_API_KEY;
//
//
// export default function JejuSection4() {
//     const [tdata, setTdata] = useState([])//전체 데이터
//     const [filteredData, setFilteredData] = useState([]); // 새로운 상태
//
//     const courseId = [50, 163, 164, 165, 166, 386, 391, 392]
//
//     useEffect(() => {
//         const getFetchData = async () => {
//             const now = new Date();//현재 시각
//
//             const CURRENT_DATE = now.toISOString().slice(0, 10).replace(/-/g, '');// CURRENT_DATE: yyyymmdd
//
//
//             const HOUR = String(now.getHours()).padStart(2, '0');// HOUR: 2자리 숫자 (예: 01, 14 등)
//
//
//             console.log('CURRENT_DATE:', CURRENT_DATE); // 예: 20250416
//             console.log('HOUR:', HOUR);                 // 예: 09
//
//             try {
//                 const results = await Promise.all(
//                     courseId.map(async (item) => {
//                         const url = `https://apis.data.go.kr/1360000/TourStnInfoService1/getTourStnVilageFcst1?serviceKey=${apiKey}&dataType=JSON&CURRENT_DATE=${CURRENT_DATE}&HOUR=09&COURSE_ID=${item}`;
//                         console.log('요청 URL:', url);
//                         const { data } = await axios.get(url);
//
//                         const itemData = data?.response?.body?.items?.item;
//                         console.log(`courseId: ${item}, itemData(테마별):`, itemData);
//
//                         return Array.isArray(itemData) ? itemData : itemData ? [itemData] : [];
//                     })
//                 );
//                 const allData = results.flat();
//                 setTdata(allData);
//                 console.log('테마기행 응답데이터 : ', allData);
//
//
//             } catch (error) {
//                 console.error('테마기행api응답 실패 :', error);
//             }
//         };
//
//         getFetchData();
//     }, []);
//
//     // 중복 제거하기
//     useEffect(() => {
//         if (!tdata || tdata.length === 0) return;
//
//         // spotName만 뽑아오기
//         let tm = tdata.map(item => item.spotName);
//
//         // 중복 제거
//         tm = [...new Set(tm)];
//
//         // 중복 제거된 spotName 중 첫 번째 항목만 필터링해서 따로 저장
//         let filtered = tdata.filter((item, idx, self) =>
//             idx === self.findIndex(t => t.spotName === item.spotName)
//         );
//
//         setFilteredData(filtered); // 새로운 state에 저장
//
//     }, [tdata]);
//
//
//     const navigate = useNavigate();
//
//     const handleClick = (code) => {
//         // navigate(`/jejuGallery?category=c5?content=${code}`);
//     };
//
//
//     return (
//         <section>
//             {/*섹션제목*/}
//             <SectionTitle
//                 icon={`🌿`}
//                 title={`이런 여행 어때요?`}
//                 subtit={`테마별 추천코스`}
//                 subClass={`text-darkPurpleJj`}
//             />
//             <ul>
//                 {filteredData.map((item, idx) => {
//                     return (
//                         <li key={idx}>
//                             <InfoComponent2
//                                 onClick={() => handleClick(item.contentsid)}
//                                 imageSrc={item?.imgThumPath || item?.imgPath}
//                                 title={item?.spotName}
//                                 txt={item?.courseName}
//                                 txt2={`예보시각: ${item?.tm}`}
//                                 // 기타 props 유지
//                             />
//                         </li>
//                     );
//                 })}
//             </ul>
//
//
//         </section>
//     );
// };