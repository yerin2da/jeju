//
// import React, {useEffect, useRef, useState} from 'react';
// import axios from "axios";
// import GuideGalleryCard from "../../components/GuideGalleryCard";
//
// import {useRecoilState} from "recoil";
//
// import {data, useLocation, useNavigate} from "react-router-dom";
//
//
// import {ImSpinner2} from "react-icons/im";
// import {pageState} from "../../store/noticeState";
// import TabMenuSlider from "../../components/TabMenuSlider";
// import SearchInput from "../../components/SearchInput";
// import NoResult from "../../components/NoResult";
// import PaginationSimple from "../../components/PaginationSimple";
//
//
// const apiKey = process.env.REACT_APP_API_JEJU;
//
//
// const JejuGallery9 = () => {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//
//     const [tdata, setTdata] = useState([])//전체 데이터
//
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const initCategory = queryParams.get("category") || 'c1';
//
//     const [selC1, setSelC1] = useState(initCategory);
//     const [selectedTag, setSelectedTag] = useState(null);//중메뉴
//
//     const [inputValue, setInputValue] = useState(""); // 인풋 필드 값
//     const [searchKeyword, setSearchKeyword] = useState(""); // 검색어 (실제 필터에 사용)
//
//     const [currentPage, setCurrentPage] = useRecoilState(pageState); // 현재 페이지
//     const [totalPages, setTotalPages] = useState(1);   // 총 페이지 수
//
//     const itemsPerPage = 9; // 한 페이지당 글 목록 수
//     const startIndex = (currentPage - 1) * itemsPerPage;
//
//     // 4. 데이터 필터링 및 페이징
//     const filteredData = tdata.filter(item => {
//         // const matchCategory =  item.contentscd?.value === selC1;
//         const matchKeyword =
//             searchKeyword === "" ||
//             item.title?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//             item.alltag?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
//             item.address?.toLowerCase().includes(searchKeyword.toLowerCase());
//
//         const matchTag =
//             !selectedTag ||                         // 태그 선택 안 했거나
//             (item.alltag && item.alltag.includes(selectedTag)); // 태그 포함하면 true
//
//         return  matchKeyword && matchTag;
//     });
//
//     const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);//시작 인덱스, 마지막 인덱스
//
//     const getFetchAllData = async (category) => {
//         const pageSize = 100;
//         let allItems = [];
//         setIsLoading(true); // 로딩 시작
//
//         try {
//             // 1. 먼저 첫 페이지를 요청해서 총 페이지 수 알아냄
//             const firstPageUrl = `http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiKey}&locale=kr&category=${category}&page=1&pageSize=${pageSize}`;
//             const { data: firstPageData } = await axios.get(firstPageUrl);
//
//             allItems = [...firstPageData.items];
//             const totalPages = firstPageData.pageCount;
//
//             // 2. 2페이지부터 마지막 페이지까지 병렬로 요청
//             const pagePromises = [];
//
//             for (let page = 2; page <= totalPages; page++) {
//                 const url = `http://api.visitjeju.net/vsjApi/contents/searchList?apiKey=${apiKey}&locale=kr&category=${category}&page=${page}&pageSize=${pageSize}`;
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
//             console.log(` 전체 ${allItems.length}개 데이터 병렬 로드 완료`);
//
//         } catch (error) {
//             console.error(' 전체 데이터 병렬 로딩 실패:', error);
//         } finally {
//             setIsLoading(false); // 로딩 종료
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
//         navigate(`/jejuGallery?category=${code}`); //  URL 업데이트
//         getFetchAllData(code);
//
//         setCurrentPage(1); // 카테고리 변경 시 첫 페이지로
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     //게시글 클릭
//     const handleItemClick = (id) => {
//         // navigate(`/jeju/${id}`);
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
//     // 5. 페이지 수 업데이트
//     useEffect(() => {
//         const total = filteredData.length;
//         const pagesCalc = Math.ceil(total / itemsPerPage);//페이징
//         setTotalPages(pagesCalc);
//     }, [filteredData]);
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
//
//             {/* 검색창 */}
//             <div className={`py-5 `}>
//                 <SearchInput
//                     inputPlaceholder={`검색어를 입력해주세요`}
//                     value={inputValue}
//                     onChange={handleInputChange}
//                     onSearch={handleSearch}
//                     className={`border-subColor2`}
//                 />
//             </div>
//
//             {isLoading ? (
//                 <div className="flex flex-col items-center justify-center gap-2 py-20 text-gray-600 transition-opacity duration-700 opacity-100 pointer-events-none">
//                     <ImSpinner2 className="animate-spin text-3xl text-gray-600"/>
//                     <p>관광지 정보를 불러오고 있어요</p>
//                 </div>
//             ) : (
//                 <>
//                     {/* 태그 UI*/}
//                     <div className="flex flex-wrap gap-2 mb-4">
//                         {displayTags.map((tag) => (
//                             <button
//                                 key={tag}
//                                 onClick={() => setSelectedTag(tag)}
//                                 className={`px-3 py-1 rounded-full text-sm ${
//                                     selectedTag === tag ? 'text-mainColor' : 'text-gray-600'
//                                 }`}
//                             >
//                                 #{tag}
//                             </button>
//                         ))}
//                     </div>
//
//                     {/*글 목록*/}
//                     {paginatedData.length !== 0 ?
//                         (
//                             paginatedData.map((item) =>
//                                 <GuideGalleryCard
//                                     key={item.contentsid}
//                                     onClick={() => handleItemClick(item.contentsid)}
//                                     item={item}
//                                 />)
//                         ) : (
//                             <NoResult/>
//                         )}
//
//                     {/*페이지네이션*/}
//                     <PaginationSimple
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         setCurrentPage={setCurrentPage}
//                     />
//                 </>
//             )}
//         </div>
//     );
// };
//
// export default JejuGallery9;