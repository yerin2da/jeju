import React from 'react';
import {useNavigate} from "react-router-dom";

export default function AllSearchCard({ item }){

    //이미지
    function getImagePath(item) {
        // 1. theme (내부 파일 배열)
        if (Array.isArray(item.img) && item.img.length > 0) {
            return `${process.env.PUBLIC_URL}/img/${item.img[0]}`;
        }

        // 2. guide: repPhoto의 imgpath or thumbnailpath
        if (item.repPhoto?.photoid?.imgpath || item.repPhoto?.photoid?.thumbnailpath) {
            const path = item.repPhoto.photoid.imgpath || item.repPhoto.photoid.thumbnailpath;
            return path.replace('http:', 'https:');
        }

        // 3. stage: imageObject
        if (item.imageObject) {
            return item.imageObject.replace('http:', 'https:');
        }

        // 4. 대체이미지
        return `${process.env.PUBLIC_URL}/img/default.jpg`;
    }

// 썸네일이 없으면 imagepath 사용

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
            <img className={`aspect-[4/3] w-full object-cover border border-gray-100 rounded-md`}
                 src={getImagePath(item)}
                 alt={item.title}
            />

            <div className={`py-2`}>
                <div className={`font-medium text-sm leading-tight line-clamp-2`}>
                    {item.title}
                </div>
            </div>

        </div>

    );

}
