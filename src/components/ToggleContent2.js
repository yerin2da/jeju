import Typography from "./Typography";
import { FaCheckCircle } from "react-icons/fa";
import IconImage from "./IconImage";
import {BiSolidMap} from "react-icons/bi";
import React from "react";
export default function ToggleContent2({nickname, time ,txt, title, subtitle, className, children,
                                          iconOpen:IconOpen, iconClose:IconClose, iconCheck:IconCheck,
                                          isOpen, onToggle, titClassName="", subTitClassName="", titWrapClassName="" ,hiddenConClassName =""})
{
    return (
        <div className={`contentsBox bg-white sm:py-10`}>
            {/* 프로필 & 썸네일 */}
            <div className="pb-6">
                <div className="flex justify-between gap-3">
                    <div className="flex gap-3">
                        {/* 프로필 이미지 */}
                        <div className="w-8 h-8 rounded-full bg-gray-200 border"></div>

                        {/* 유저 정보 */}
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <p className="font-semibold text-sm">{nickname}님</p>
                                <span className="text-xs text-textDarkGray">&middot; {time} 전</span>
                            </div>
                        </div>
                    </div>

                    {/* 썸네일 이미지 */}
                    <div className="w-12 h-12 rounded-md border overflow-hidden flex-shrink-0 bg-gray-100">
                        {/* 썸네일 이미지 들어갈 자리 */}
                    </div>
                </div>

                <p className="text-sm text-textDarkGray max-w-[180px] xs:max-w-[300px] sm:max-w-[450px]">
                    {txt}
                </p>
            </div>

            {/* 태그 */}
            <div className={`pb-2`}>
                <p className={`inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500 mr-1 mb-1`}>
                    {/*국가*/}
                    <IconImage
                        imageSrc={`/img/JPY.png`}
                        title="국기"
                        className="w-5 border border-gray-100 inline"
                    />
                    <span className={`pl-0.5`}>일본 엔</span>
                </p>

                <p className={`inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500 mr-1 mb-1`}>
                    {/*위치*/}
                    <BiSolidMap className={`inline-block text-lg text-black`}/>
                    <span className={`pl-0.5`}>논현동</span>
                </p>

                <p className={`inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-500 mr-1 mb-1`}>
                    {/*환율*/}
                    <span>환율 1,456.18</span>
                </p>
            </div>

            {/* 신청일 & KRW */}
            <div className="flex items-center">
                {/* 왼쪽 컬러 바 */}
                <div className="w-2 h-9 rounded bg-subColor2 mr-3"></div>

                {/* 오른쪽 내용 */}
                <div className="text-sm text-subColor2">
                    신청일 24.2.14(금)
                    <p className={`font-semibold text-base`}>KRW 1,000,000</p>
                </div>
            </div>

            {/*히든 콘텐츠*/}
            {isOpen && <div className={`visible ${hiddenConClassName}`}>{children}</div>}

            {/*토글 아이콘*/}
            <div className={`flex justify-center items-center text-sm border-t py-3 sm:pt-4 mt-6 -m-8 text-gray-400 cursor-pointer`}
                 onClick={onToggle}>

                {isOpen ? (
                    IconClose && <div className={`flex items-center justify-center gap-2`}>닫기<IconClose className="text-lg"/></div>
                ) : (
                    IconOpen &&  <div className={`flex items-center justify-center gap-2`}>더보기<IconOpen className="text-lg"/></div>
                )}
            </div>
        </div>
    );

};