// import data from "../db/data.json";
// import React, {useEffect, useRef, useState} from 'react';
// import TailButton from "../UI/TailButton";
// import axios from "axios";
// import GalleryCard2 from "../08/GalleryCard2";
// import GuideGalleryCard from "../../components/GuideGalleryCard";
// import TabMenuSlider from "../components/TabMenuSlider";
// import {useRecoilState} from "recoil";
// import {pageState} from "../store/noticeState";
// import {useNavigate} from "react-router-dom";
// import SearchInput from "../components/SearchInput";
// import NoResult from "../components/NoResult";
// // 관광지 정보
// const apiBaseUrl = process.env.REACT_APP_API_JEJU;
//
// // c1
// const Jeju = () => {
//     const searchRef = useRef();
//     const [tdata, setTdata] = useState([])
//     // const [cards, setCards] = useState([]);
//     const [selC1, setSelC1] = useState('c1'); // 기본 선택값
//
//
//     const [inputValue, setInputValue] = useState(""); // 인풋 필드 값
//     const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (실제 필터에 사용)
//
//     const [currentPage, setCurrentPage] = useRecoilState(pageState); // 현재 페이지
//     const [totalPages, setTotalPages] = useState(1);   // 총 페이지 수
//
//     const navigate = useNavigate();
//
//     const itemsPerPage = 9; // 한 페이지당 글 목록 수
//     const startIndex = (currentPage - 1) * itemsPerPage;
//
//     const [selectedTag, setSelectedTag] = useState(null);
//
//     // 4. 데이터 필터링 및 페이징
//     const filteredData = tdata.filter(item => {
//         const matchCategory = selC1 === "all" || item.contentscd?.value === selC1;
//         const matchKeyword =
//             searchKeyword === "" ||
//             item.title?.includes(searchKeyword) ||
//             item.alltag?.includes(searchKeyword) ||
//             item.address?.includes(searchKeyword)
//
//         const matchTag =
//             !selectedTag ||                         // 태그 선택 안 했거나
//             (item.alltag && item.alltag.includes(selectedTag)); // 태그 포함하면 true
//
//         return matchCategory && matchKeyword && matchTag;
//     });
//
//     const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);//시작 인덱스, 마지막 인덱스
//
//     const getFetchAllData = async (category) => {
//         const pageSize = 100;
//         let allItems = [];
//
//         try {
//             // 1. 먼저 첫 페이지를 요청해서 총 페이지 수 알아냄
//             const firstPageUrl = `http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiBaseUrl}&locale=kr&category=${category}&page=1&pageSize=${pageSize}`;
//             const { data: firstPageData } = await axios.get(firstPageUrl);
//
//             allItems = [...firstPageData.items];
//             const totalPages = firstPageData.pageCount;
//
//             // 2. 2페이지부터 마지막 페이지까지 병렬로 요청
//             const pagePromises = [];
//
//             for (let page = 2; page <= totalPages; page++) {
//                 const url = `http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiBaseUrl}&locale=kr&category=${category}&page=${page}&pageSize=${pageSize}`;
//                 pagePromises.push(axios.get(url));
//             }
//
//             const results = await Promise.all(pagePromises);
//
//             // 3. 나머지 페이지 데이터 합치기
//             results.forEach(res => {
//                 if (res.data.items?.length) {
//                     allItems = [...allItems, ...res.data.items];
//                 }
//             });
//
//             setTdata(allItems);
//             console.log(`✅ 전체 ${allItems.length}개 데이터 병렬 로드 완료`);
//         } catch (error) {
//             console.error('❌ 전체 데이터 병렬 로딩 실패:', error);
//         }
//     };
//
//     useEffect(() => {
//         getFetchAllData(selC1);
//     }, []);
//
//     // 카테고리 변경
//     const handleSelC1 = (code) => {
//         setSelC1(code);
//         setSelectedTag(null); // #태그 선택 초기화
//         getFetchAllData(code);
//
//         setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//
//     //게시글 클릭
//     const handleItemClick = (id) => {
//         navigate(`/jeju/${id}`);
//     }
//
//     //검색어 입력
//     const handleInputChange = (e) => {
//         const value = e.target.value;
//         setInputValue(value);
//
//         // 인풋이 비었을 때 전체 데이터 다시 보여주기
//         if (value === "") {
//             setSearchKeyword("");
//             setCurrentPage(1);
//             window.scrollTo({ top: 0, behavior: 'smooth' });
//         }
//     };
//
//     //검색 버튼
//     const handleSearch = () => {
//         setSearchKeyword(inputValue);
//         setCurrentPage(1);
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     //이전 버튼
//     const handlePrev = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };
//
//     //다음 버튼
//     const handleNext = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage(currentPage + 1);
//         }
//     };
//
//     // 5. 페이지 수 업데이트
//     useEffect(() => {
//         const total = filteredData.length;
//         const pagesCalc = Math.ceil(total / itemsPerPage);//페이징
//         setTotalPages(pagesCalc);
//     }, [filteredData]);
//
//     // 6. 페이지 이동 시 스크롤 최상단
//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     }, [currentPage]);
//
//
//
//     const extractedTags = Array.from(
//         new Set(
//             tdata
//                 .flatMap(item =>
//                     item.alltag
//                         ?.split(/[,#]/)          // , 또는 # 기준으로 자름
//                         .map(tag => tag.trim())  // 앞뒤 공백 제거
//                         .filter(Boolean)         // 빈 문자열 제거
//                 )
//         )
//     );
//
//     const popularTags = ['유네스코', '오름', '액티비티', '숲', '포토스팟'];
//
//     const displayTags = popularTags.filter(tag =>
//         extractedTags.includes(tag)
//     );
//
//
//
//     return (
//         <div>
//             {/* 대분류 탭 */}
//             <TabMenuSlider
//                 spaceBetween={3}
//                 data={data.jejuCategory}
//                 onClick={handleSelC1}
//                 selTab={selC1}
//                 tClass={`bg-mainColor text-white`}
//                 fClass={`text-textBlack `}
//             />
//             <div className={`py-5`}>
//                 {/* 서치인풋 */}
//                 <SearchInput
//                     inputPlaceholder={`검색어를 입력해주세요`}
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onSearch={handleSearch}
//                     className={`border-subColor2`}
//                 />
//             </div>
//             {/* 필터 UI*/}
//             <div className="flex flex-wrap gap-2 mb-4">
//                 {displayTags.map((tag) => (
//                     <button
//                         key={tag}
//                         onClick={() => setSelectedTag(tag)}
//                         className={`px-3 py-1 rounded-full text-sm ${
//                             selectedTag === tag ? 'bg-mainColor text-white' : 'bg-gray-100 text-gray-600'
//                         }`}
//                     >
//                         #{tag}
//                     </button>
//                 ))}
//             </div>
//
//             {/*글 목록*/}
//             {paginatedData.length !== 0
//             ? (
//                 paginatedData.map((item) =>
//                 <GuideGalleryCard
//                     key={item.contentsid}
//                     onClick={() => handleItemClick(item.contentsid)}
//                     item={item}
//                 />)
//             )
//             : (
//                 <NoResult/>
//             )}
//
//
//             <div className="text-base flex justify-center items-center pt-4 text-textDarkGray">
//                 <TailButton
//                     caption="이전"
//                     bcolor="blue"
//                     handleClick={handlePrev}
//                     disabled={currentPage === 1}
//                 />
//                 <span className="px-4 text-textBlack"> {currentPage} / {totalPages} </span>
//                 <TailButton
//                     caption="다음"
//                     bcolor="blue"
//                     handleClick={handleNext}
//                     disabled={currentPage === totalPages}
//                 />
//             </div>
//         </div>
//     );
// };
//
// export default Jeju;