import React from 'react';

export default function ExhibiGalleryComponent({ item })


{
    return (
        <div
            onClick={() => window.open(item.url, "_blank")}
            className={`group cursor-pointer relative w-full h-100 flex flex-col`}>

            {/* 포스터 이미지 */}
            <div className={`h-40 xs:h-60 overflow-hidden relative z-2 rounded-lg border border-gray-100`}>
                <img
                    className={`w-full h-full object-cover duration-300 group-hover:scale-110`}
                    src={item.imageObject ? item.imageObject : `${process.env.PUBLIC_URL}/img/default.jpg`}
                    alt={item.title}
                />
            </div>

            {/* 설명 박스 */}
            <div className={`relative z-2 py-2 flex flex-col justify-between flex-1`}>
                <p className={`font-semibold text-sm multi-ellipsis2 leading-tight`}>{item.title}</p>
                <p className={`text-xs text-gray-500 pt-1`}>{item.period}</p>
            </div>

        </div>
    );

};
