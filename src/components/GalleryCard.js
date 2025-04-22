import {useRecoilValue} from "recoil";
import {nicknameState} from "../recoil/atoms";
import { BiSolidMap } from "react-icons/bi";
import IconImage from "./IconImage";
import {FiMapPin, FiMinus, FiPlus} from "react-icons/fi";
import React from "react";
import {LuClock} from "react-icons/lu";
import TailButton from "../UI/TailButton";
import {BsChatRightText} from "react-icons/bs";
import useToggleOpen from "../hooks/useToggleOpen";
import ToggleContent from "./ToggleContent";
import ToggleContent2 from "./ToggleContent2";
import {FaAngleDown, FaAngleUp} from "react-icons/fa6";

export default function GalleryCard() {
    const nickname = useRecoilValue(nicknameState)
    const { openIndex, handleToggle } = useToggleOpen();// 토글

    return (
        // 거래내역 흰색 카드
        <ToggleContent2
            nickname={nickname}
            title=""
            subtitle=""
            txt=""
            iconOpen={FaAngleDown}
            iconClose={FaAngleUp}
            isOpen={openIndex === 0}
            onToggle={() => handleToggle(0)}
            titWrapClassName="gap-3"
            hiddenConClassName="pt-4"
        >

            {/* 숨김콘텐츠 */}
            <div className="w-full p-3 bg-gray-50 rounded-md text-sm mb-6">
                <div className="py-2">
                    {/*거래일시*/}
                    <div className="flex items-start gap-4 pb-0.5">
                        <p className={`text-gray-500 flex items-center gap-2`}><LuClock/>거래일시</p>
                        <p className={`flex-1 text-subColor2`}>24.11.13(수) 오전 10:00</p>
                    </div>

                    {/*거래장소*/}
                    <div className=" flex items-start gap-4 pb-2">
                        <p className={`text-gray-500 flex items-center gap-2`}><FiMapPin/>거래장소</p>
                        <p className={`flex-1 text-subColor2`}>논현역 3번출구 앞</p>
                    </div>
                </div>

                {/*동전 개수*/}
                <div className={`text-xs font-base text-gray-500`}>
                    <span className={`pr-4 whitespace-nowrap`}>
                        1센트 2ㅇㅇㅇㅇㅇ개
                    </span>
                    <span className={`pr-4 whitespace-nowrap`}>
                        2센트 50개
                    </span>

                    <span className={`pr-4 whitespace-nowrap`}>
                        1000엔 51200개
                    </span>
                    <span className={`pr-4 whitespace-nowrap`}>
                        1센트 2ㅇㅇㅇㅇㅇ개
                    </span>
                    <span className={`pr-4 whitespace-nowrap`}>
                        2센트 50개
                    </span>

                    <span className={`pr-4 whitespace-nowrap`}>
                        1000엔 51200개
                    </span>
                </div>

            </div>

            {/* 버튼 */}
            <div className="w-full flex items-center gap-2">
                <TailButton
                    type="button"
                    caption={`거래하기`}
                    // handleClick={``}
                    bcolor="btn-mainColor"
                    className={`flex-1`}
                />
                <TailButton
                    type="button"
                    caption={
                        <p className="flex items-center gap-1">
                          <BsChatRightText />
                          <span className="text-base">채팅</span>
                        </p>
                    }
                    // handleClick={``}
                    bcolor="btnBorder-subColor2"
                    className={`w-20 xs:w-24 sm:w-32 whitespace-nowrap`}
                />
            </div>
        </ToggleContent2>
    );
};