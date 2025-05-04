export default function GuideGalleryCard({item,onClick}) {

    let sptags = [];

    if (item.alltag && typeof item.alltag === 'string') {
        sptags = [...new Set(
            item.alltag
            .split(/[,#]/)         // ✅ 쉼표 또는 # 기준으로 분리
            .map((kw) => kw.trim())      // 공백 제거
            .filter(Boolean)           // 빈 문자열 제거
    )];}

    let imgPath = item.repPhoto?.photoid.imgpath;//이미지
    let imgThumPath = item.repPhoto?.photoid.thumbnailpath;//썸네일 이미지

    // 썸네일이 없으면 imagepath 사용
    let finalImgPath = (typeof imgThumPath === 'string' && imgThumPath.trim())
        ? imgThumPath
        : imgPath;



    return (
        <div
            className={`contentsBox !p-0 overflow-hidden !rounded-2xl bg-white`}
            onClick={onClick}
        >
             <img className={`h-48 w-full object-cover`}
                  src={typeof finalImgPath === 'string' && finalImgPath.includes('http')
                          ? finalImgPath.replace('http:', 'https:')
                          : finalImgPath}
                  alt = {item.repPhoto?.descseo}
             />

            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2`}>
                    {item.repPhoto?.descseo}
                </div>
                <div className={`text-gray-700`}>
                    <p className={`text-sm xs:text-base font-medium multi-ellipsis`}>{item.introduction}</p>
                    <p className={`text-xs xs:text-sm text-gray-500`}>{item.address}</p>
                </div>
                <div className={`pt-4 pb-2`}>
                    {sptags.map(((kw, idx) =>
                        <span
                            key={idx}
                            className={`inline-block bg-[#E7F0D2] rounded-full 
                                text-sm font-medium text-[#739D64] border-[#739D64] mr-1 mb-2 px-3 py-1
                            `}
                        >
                            {kw}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};