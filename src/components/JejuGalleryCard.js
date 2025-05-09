// export default function JejuGalleryCard({item}) {
//
//     let sptags = [];
//
//     if (item.alltag && typeof item.alltag === 'string') {
//         sptags = [...new Set(
//             item.alltag
//             .split(/[,#]/)         // ✅ 쉼표 또는 # 기준으로 분리
//             .map((kw) => kw.trim())      // 공백 제거
//             .filter(Boolean)           // 빈 문자열 제거
//     )];}
//
//     let imgPath = item.repPhoto.photoid.imgpath;//이미지
//     let imgThumPath = item.repPhoto.photoid.thumbnailpath;//썸네일 이미지
//
//     // 썸네일이 없으면 imagepath 사용
//     let finalImgPath = (typeof imgThumPath === 'string' && imgThumPath.trim())
//         ? imgThumPath
//         : imgPath;
//
//     return (
//         <div className={`contentsBox !p-0 overflow-hidden !rounded-2xl bg-white`}>
//              <img className={`h-48 w-full object-cover`}
//                   src={typeof finalImgPath === 'string' && finalImgPath.includes('http')
//                           ? finalImgPath.replace('http:', 'https:')
//                           : finalImgPath}
//                   alt = {item.repPhoto.descseo}
//              />
//
//             <div className={`px-6 py-4`}>
//                 <div className={`font324223-bold text-xl mb-2`}>
//                     {item.repPhoto.descseo}
//                 </div>
//                 <div className={`text-gray-700`}>
//                     <p className={`text-sm font324223-medium multi-ellipsis`}>{item.introduction}</p>
//                     <p className={`text-xs text-gray-500`}>{item.address}</p>
//                 </div>
//                 <div className={`pt-4 pb-2`}>
//                     {sptags.map(((kw, idx) =>
//                         <span
//                             key={idx}
//                             className={`inline-block bg-gray-100 rounded-full
//                                 text-sm font324223-semibold text-gray-500 mr-2 mb-2 px-2 py-0.5
//                             `}
//                         >
//                             {kw}
//                         </span>
//                     ))}
//                 </div>
//             </div>
//
//         </div>
//     );
// };