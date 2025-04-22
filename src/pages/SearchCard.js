import React, { useState } from 'react';
import TailButton from "../UI/TailButton";

const SearchCard = () => {
    const [activeTab, setActiveTab] = useState('popular');

    return (
        <div className="rounded-xl text-sm">
            {/* 탭 메뉴 */}
            <div className="flex space-x-1.5 font-medium">
                <button
                    className={`w-[115px] py-2.5 rounded-t-xl ${
                        activeTab === 'popular' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500 shadow-topInner'
                    }`}
                    onClick={() => setActiveTab('popular')}
                >
                    인기 순 🔥
                </button>
                <button
                    className={`w-[115px] py-2.5 rounded-t-xl ${ 
                        activeTab === 'latest' ? 'bg-white text-black' : 'bg-gray-200 text-gray-500 shadow-topInner'
                    }`}
                    onClick={() => setActiveTab('latest')}
                >
                    최신 순
                </button>
            </div>

            {/* 카드 컨텐츠 */}
            <div className="bg-white p-5 rounded-b-xl rounded-tr-xl">
                {/* 드롭다운 1 */}
                <div className="pb-3">
                    <select className="w-full">
                        <option>가격 높은 순</option>
                        <option>가격 낮은 순</option>
                        
                    </select>
                </div>

                {/* 조회 버튼 */}
                <TailButton
                    caption="조회"
                    bcolor={`btn-lightPurple`}
                    className={`w-full !border-subColor2 !text-sm !text-subColor2`}
                />

            </div>
        </div>
    );
};

export default SearchCard;
