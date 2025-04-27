import React from 'react';

export default function MusicGalleryComponent({item,
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
            className={`relative w-full h-80 flex flex-col`}>

            <div className="absolute bottom-0 left-0 w-full h-[60%] bg-white"></div>{/* 오버레이 */}

            {/* 포스터 이미지 */}
            <div className={` w-full h-80 overflow-hidden relative z-2 border`}>
                <img
                    className={`w-full h-full object-cover`}
                    src={item.imageObject ? item.imageObject : `${process.env.PUBLIC_URL}/img/default.jpg`}
                    alt={item.title}
                />
            </div>

            {/* 설명 박스 */}
            <div className={`relative z-2 pt-2 pb-4 flex flex-col justify-between flex-1 `}>
                <p className={`font-semibold text-base multi-ellipsis2 bg-[#46678f] h-full text-white  px-4`}>{item.title}</p>
                <p className={`whitespace-nowrap text-sm font-medium py-2 border-b-2 border-[#86bdff] w-full px-4 text-[#003b83]`}>{item.period}</p>
            </div>

        </div>
    );

};
