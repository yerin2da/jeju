export default function GuideGalleryCard({item,onClick, onClickSpan}) {

    let sptags = [];

    if (item.alltag && typeof item.alltag === 'string') {
        sptags = [...new Set(
            item.alltag
            .split(/[,#]/)         // 쉼표 또는 # 기준으로 분리
            .map((kw) => kw.trim()) // 공백 제거
            .filter(Boolean)           // 빈 문자열 제거
    )];}

    //이미지
    function getImageGuide(item) {

        // 2. guide: repPhoto의 imgpath or thumbnailpath
        if (item.repPhoto?.photoid?.imgpath || item.repPhoto?.photoid?.thumbnailpath) {
            const path = item.repPhoto.photoid.imgpath || item.repPhoto.photoid.thumbnailpath;
            return path.replace('http:', 'https:');
        }

        // 4. 대체이미지
        return `${process.env.PUBLIC_URL}/img/default.jpg`;
    }


    return (
        <div
            className={`contentsBox !p-0 overflow-hidden !rounded-2xl bg-white`}
            onClick={onClick}
        >
             <img className={`h-48 w-full object-cover cursor-pointer`}
                  src={getImageGuide(item)}
                  alt = {item.title}
             />

            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2 cursor-pointer`}>
                    {item.title}
                </div>
                <div className={`text-gray-700`}>
                    <p className={`text-sm xs:text-base font-medium multi-ellipsis`}>{item.introduction}</p>
                    <p className={`text-xs xs:text-sm text-gray-500`}>{item.address}</p>
                </div>
                <div className={`pt-4 pb-2`}>
                    {sptags.map(((kw, idx) =>
                        <span
                            key={idx}
                            className={`inline-block bg-[#E7F0D2] text-[#739D64] border-[#739D64] rounded-full cursor-pointer
                                text-sm font-medium  mr-1 mb-2 px-3 py-1  hover:bg-green-100
                            `}
                            onClick={(e) => {
                                e.stopPropagation(); // 카드 전체 클릭 방지
                                onClickSpan && onClickSpan(kw); // 선택한 태그 전달
                            }}
                        >
                            #{kw}
                        </span>
                    ))}
                </div>
            </div>

        </div>
    );
};