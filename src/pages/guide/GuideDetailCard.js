import React from "react";
import Comment from "../../13paging/Comment";

export default function GuideDetailCard({item,onClick}) {

    let sptags = [];

    if (item.alltag && typeof item.alltag === 'string') {
        sptags = [...new Set(
            item.alltag
                .split(/[,#]/)         // ✅ 쉼표 또는 # 기준으로 분리
                .map((kw) => kw.trim())      // 공백 제거
                .filter(Boolean)           // 빈 문자열 제거
        )];
    }

    const imgPath = item?.repPhoto?.photoid?.imgpath;
    const default2 = `${process.env.PUBLIC_URL}/img/default2.jpg`;


    return (
        <div
            className={`-mx-5 -mt-5 w-screen max-w-screen-md`}
        >
            <img className={`h-52 xs:h-72 sm:h-[24rem] w-full object-cover`}
                 src={imgPath || default2}
                 alt={item.title}
            />

            <div className={`p-5 space-y-6`}>
                <div className={``}>
                    <div className={`font-bold text-xl pb-1`}>
                        {item.title}
                    </div>
                    <p className={`text-sm xs:text-base text-gray-500`}>{item.address}</p>
                </div>

                <p className={`text-lg `}>"{item.introduction}"</p>

                <div className={`py-2`}>
                    <div className={`font-bold text-base pb-4`}>장소 정보</div>

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

            {/* 선 */}
            <div className={`border-t w-full pb-2`}></div>

        </div>
    );
};