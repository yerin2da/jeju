import TextInput from "./TextInput";
import IconImage from "./IconImage";
import BannerLink from "./BannerLink";
import {IoSearch} from "react-icons/io5";
import {useRecoilValue} from 'recoil';
import {nicknameState, isLoggedInState} from '../recoil/atoms';
import {useNavigate} from "react-router-dom";
import SearchInput from "./SearchInput";
import {useRef} from "react";

export default function MainBanner({ texts, imageSrc, inputPlaceholder, className }) {
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const nickname = useRecoilValue(nicknameState);
    const isLoggedIn = useRecoilValue(isLoggedInState);

    console.log('로그인상태:', isLoggedIn);
    console.log('닉네임:', nickname);

    return (
        <div className={`bg-mainColor rounded-[1.3rem] p-6 h-56 flex flex-col justify-between text-white text-left ${className}`}>
            {!isLoggedIn ? (
                <BannerLink to="/login" text={`로그인해주세요`} />
            ) : (
                <BannerLink to="/mypage" text={`${nickname}님 환영합니다💕`} />
            )}

            <div className='flex items-center justify-between relative'>
                <p className={`text-lg font-medium xs:text-xl`}>당신의 화폐로<br/><b>새로운 가치</b>를 만듭니다</p>
                <div className="w-28 xs:w-36 absolute bottom-[-20px] right-0">
                    <IconImage className={`w-full`} title="메인배너" imageSrc='/img/login_banner.png'/>
                </div>
            </div>

            <SearchInput
                inputPlaceholder={"어떤 나라 동전을 찾으시나요?"}
                className={``}
                ref={inputRef}
                onSearch={() => {
                    const keyword = inputRef.current?.value;
                    if (!keyword) return alert("검색어를 입력하세요");
                    navigate("/findCurrency", { state: { keyword } });//페이지 이동과 동시에 키워드를 넘김
                }}

            />
        </div>
    );
};