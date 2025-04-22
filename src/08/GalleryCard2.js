export default function GalleryCard2({item}) {

    let sptags = item.galSearchKeyword.includes(',')
                            ? item.galSearchKeyword.split(',')//쉼표(,)를 기준으로 문자열을 분리하여 배열로 변환
                            // [
                            //   "서울빛초롱축제",
                            //   " 서울특별시 종로구",
                            //   " 2018 하반기 기획사진",
                            //   " 청계천 야경",
                            //   " 서울 등 축제",
                            //   " 서울 축제"
                            // ]
                            : [item.galSearchKeyword]

    sptags = sptags.map(kw => <span
                                className={`inline-block bg-gray-200 rounded-full text-sm font-semibold text-gray-700 mr-2 mb-2`}
                                key={kw.trim()}>{kw.trim()}</span>//kw:내부에서 순회하는 문자열 값 (각 키워드)

    )

    return (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg`}>
             <img className={`h-48 w-full`}
                  src={item.galWebImageUrl.includes('http:')
                          ? item.galWebImageUrl.replace('http:', 'https:')
                          : item.galWebImageUrl}
                  alt = {item.galTitle}
             />

            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2`}>
                    {item.galTitle}
                </div>
                <div className={`text-gray-700`}>
                    {item.galPhotographyLocation}
                </div>
                <div className={`px-6 pt-4 pb-2`}>
                    {sptags}
                </div>
            </div>

        </div>
    );
};