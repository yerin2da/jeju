import {useState} from "react";

export default function MyListItem({title, imgUrl, content}) {
    // let cnt = 0;
    const [cnt, setCnt] = useState(0);
    const handleClick = () =>{
        // cnt = cnt + 1;
        setCnt(cnt + 1);
    }
    return (
        <div className="flex w-full h-full justify-center items-start p-2 border border-gray-200">

            <div className="flex w-1/3 m-2">
                <img src={imgUrl} alt={title} />{/* 이미지는 퍼블릭폴더가 기준*/}
            </div>
            <div className="flex w-2/3 h-full flex-col justify-between p-2 m-2">
                <div>
                    <h1 className="text-xl font-bold">{title}</h1>
                    <p>{content}</p>
                </div>
                <div className="flex justify-end items-center">
                    <span onClick={handleClick} className="cursor-pointer">❤️</span>
                    <span className="inline-flex mx-2 font-bold">좋아요</span>{/*mx: 오X왼*/}
                    <span className="font-bold text-xl">{cnt}</span>
                </div>
            </div>

        </div>
    );
};