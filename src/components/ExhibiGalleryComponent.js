import React from 'react';

export default function ExhibiGalleryComponent({item,
                                               tit='',
                                               wrapClass='',
                                               imgClass='',
                                               region='',
                                               regiClass='',
                                               tel='',
                                               date=''
                                               })
{
    return (
        <div
            onClick={() => window.open(item.url, "_blank")}
            className={`relative w-full h-100 flex flex-col`}>

            {/*<div className="absolute bottom-0 left-0 w-full h-[60%] bg-gray-200"></div>/!* 오버레이 *!/*/}

            {/* 포스터 이미지 */}
            <div className={`h-40 xs:h-60 overflow-hidden relative z-2 rounded-lg border border-gray-100`}>
                <img
                    className={`w-full h-full object-cover`}
                    src={item.imageObject ? item.imageObject : `${process.env.PUBLIC_URL}/img/default.jpg`}
                    alt={item.title}
                />
            </div>

            {/* 설명 박스 */}
            <div className={`relative z-2 py-2 flex flex-col justify-between flex-1`}>
                <p className={`font-semibold text-sm multi-ellipsis2`}>{item.title}</p>
                <p className={`text-xs text-gray-500 pt-1`}>{item.period}</p>
            </div>

        </div>
    );

};
