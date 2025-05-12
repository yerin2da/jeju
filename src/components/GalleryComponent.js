import React from 'react';

const GalleryComponent = ({item,
                              tit='',
                              wrapClass='',
                              imgClass='',
                              region='',
                              regiClass='',
                              tel='',
                              date=''
}) => {
    return (
        <div
            onClick={() => window.open(item.url, "_blank")}
            className={`cursor-pointer group contentsBox !p-0 overflow-hidden !rounded-2xl bg-white ${wrapClass}`}>
            <div className={`relative overflow-hidden`}>
                <img className={`${imgClass} h-40 w-full object-cover duration-300 group-hover:scale-110`}
                     src={item.imageObject ? item.imageObject : `${process.env.PUBLIC_URL}/img/default.jpg`}
                     alt={item.title}
                />
                <div className={`absolute top-0 left-0 w-fit ${regiClass}`}><p>{region}</p></div>
            </div>

            <div className={`p-2`}>
                <p className={`font-bold ${tit}`}>{item.title}</p>
                <div className={`text-xs font-semibold text-gray-700`}>
                    <p className={`multi-ellipsis ${tel}`}><span>문의 :</span> {item.contactPoint}</p>
                    <p className={`whitespace-nowrap`}><span className={`${date}`}>기간 :</span> <span className={`text-green-600`}>{item.period}</span></p>
                </div>

            </div>

        </div>
    );
};

export default GalleryComponent;