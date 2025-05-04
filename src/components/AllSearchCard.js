import React from 'react';
import {useNavigate} from "react-router-dom";

export default function AllSearchCard({ item }){
let imgPath = item.repPhoto?.photoid.imgpath;//이미지
let imgThumPath = item.repPhoto?.photoid.thumbnailpath;//썸네일 이미지

// 썸네일이 없으면 imagepath 사용
let finalImgPath = (typeof imgThumPath === 'string' && imgThumPath.trim())
    ? imgThumPath
    : imgPath;

//게시글 클릭
    const navigate = useNavigate();
    const handleClick = () => {
        if (item.url) {
            window.open(item.url, '_blank');
        } else {
            navigate(`/guide/gallery/${item.contentscd.value}/${item.contentsid}`,
                { state: { id:item.contentsid } });
        }
    };
    return (
        <div
            className={``}
            onClick={handleClick}

        >
            <img className={`h-48 w-full object-cover`}
                 src={
                typeof finalImgPath === 'string' && finalImgPath.includes('http')
                     ? finalImgPath.replace('http:', 'https:')
                     : finalImgPath ||
                        item.imageObject ? item.imageObject : `${process.env.PUBLIC_URL}/img/default.jpg`
            }
                 alt={item.repPhoto?.descseo || item.title}
            />

            <div className={`px-6 py-4`}>
                <div className={`font-bold text-xl mb-2`}>
                    {item.repPhoto?.descseo || item.title}
                </div>
            </div>

        </div>

    );

}
