// import React, { useEffect, useState } from "react";
// import { FaCamera, FaTimes } from "react-icons/fa";
// import axios from "axios"; // 카메라 및 삭제 아이콘 사용
//
// const MultiImageUpload = ({ maxLength = 3, className, isEditMode = false, initialFiles = [] }) => {
//
//     const url = "http://localhost:5000/upload";
//     const deleteUrl = "http://localhost:5000/delete"; // 삭제 엔드포인트 분리
//
//     // 업로드된 파일 리스트
//     const [uploadedFiles, setUploadedFiles] = useState([]);
//
//     // 삭제 예약된 att_pk 리스트
//     const [deleteList, setDeleteList] = useState([]);
//
//     // 파일 업로드 (즉시 서버 저장)
//     const handleFileUpload = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
//
//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("mode", "save_file");
//
//         try {
//             const res = await axios.post(url, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//
//
//             if (res.data.SUCCESS === "TRUE") {
//                 const { file_name, src, att_pk } = res.data.RECORD;
//
//                 setUploadedFiles(prev => [...prev, {
//                     file_name,
//                     src,
//                     att_pk: att_pk
//                 }]);
//                 console.log("파일 업로드 성공");
//             } else {
//                 alert("업로드 실패: " + res.data.MESSAGE);
//             }
//
//         } catch (err) {
//             console.error("업로드 에러:", err);
//             alert("오류 발생.\n관리자에게 문의해주세요.");
//         }
//
//         event.target.value = null; // 선택된 파일을 초기화하여 사용자가 같은 파일을 다시 업로드할 수 있도록 함
//     };
//
//     // 파일 삭제
//     const handleFileDelete = async (file) => {
//         const { file_name, att_pk } = file;
//
//         if (att_pk === 0) { // 임시 파일인 경우
//             try {
//                 const res = await axios.post(deleteUrl,
//                     { file_name }, // body로 보내기
//                     {
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     }
//                 );
//
//                 if (res.data.SUCCESS === "TRUE") {
//                     console.log("임시 파일 삭제 성공");
//                     setUploadedFiles(prev => prev.filter(f => f.file_name !== file_name));
//                 } else {
//                     alert("삭제 실패: " + res.data.MESSAGE);
//                 }
//
//             } catch (err) {
//                 console.error("삭제 에러:", err);
//                 alert("삭제 중 오류 발생");
//             }
//
//         } else { // 수정일 때 DB 저장 파일
//             setDeleteList(prev => [...new Set([...prev, att_pk])]);
//             setUploadedFiles(prev => prev.filter(f => f.att_pk !== att_pk));
//             console.log("삭제 예약 완료 (다음 단계에서 처리됩니다)");
//         }
//     };
//
//     // 수정 모드일 때 초기 파일 설정 (if editing, we need to initialize uploaded files)
//     useEffect(() => {
//         if (isEditMode) {
//             setUploadedFiles(initialFiles); // 수정 모드에서 초기 파일 리스트 세팅
//         }
//     }, [isEditMode, initialFiles]);
//
//     return (
//         <div className={`flex items-center gap-3 ${className}`} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//             {uploadedFiles.map((file, index) => (
//                 <div key={index} className={`relative inline-block`}>
//                     <img
//                         src={file.src}
//                         alt={`preview-${index}`}
//                         className={`w-24 h-20 object-cover border-0 rounded-lg`}
//                     />
//
//                     {/* 삭제 버튼 */}
//                     <button
//                         onClick={() => handleFileDelete(file)}
//                         className={`absolute top-[-5px] right-[-5px] w-5 h-5 flex items-center justify-center rounded-full bg-[#f27474] text-white`}
//                     >
//                         <FaTimes size={12} />
//                     </button>
//                 </div>
//             ))}
//
//             {/* 업로드 버튼 (최대 3개 제한) */}
//             {uploadedFiles.length < maxLength && (
//                 <label className={`w-24 h-20 flex flex-col items-center gap-1 justify-center text-textBlack border border-dashed border-textGray rounded-lg cursor-pointer`}>
//                     <FaCamera size={20} />
//                     <span className={`text-sm`} >({uploadedFiles.length}/{maxLength})</span>
//                     <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileUpload}
//                         style={{ display: "none" }}
//                     />
//                 </label>
//             )}
//         </div>
//     );
// };
//
// export default MultiImageUpload;
