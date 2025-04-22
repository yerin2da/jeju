import {Link, useLocation, matchPath} from "react-router-dom";
import BackButton from "../UI/BackButton";
import HambergerButton from "../UI/HambergerButton";

export default function Header() {
    const location = useLocation();
    const currentPath = location.pathname;

    const captions = {//페이지 제목
        "/sell": "동전 팔기",
        "/sell/complete": "동전 팔기",
        "/buy": "동전리스트",
        "/notice": "공지사항",
        "/register": "회원가입",
        "/guide": "이용가이드",
        "/wallet": "내지갑",
    };

    const showLogo = ["/", "/mypage"].includes(currentPath);

    const bgBlack = ["/findCurrency", "/buy"].includes(currentPath);//헤더 블랙

    const hiddenHamberger = ["/login", "/register"].includes(currentPath);



    // 기본 caption + 동적 라우트 처리
    let caption = captions[currentPath];
    if (matchPath("/notice/:id", currentPath)) {// 현재 경로(currentPath)가 /notice/숫자 패턴과 같으면
        caption = "공지사항";
    }

    return (

        <header className={`w-full text-2xl h-20 px-6 py-11 sticky top-0 left-0 z-[9999] 
                ${bgBlack 
                    ? "bg-midBlack text-white"
                    : "bg-white"}
                `}>

            <div className={`h-full flex items-center justify-between`}>
                {showLogo ? (
                    <h1 className="text-3xl font-semibold text-mainColor">
                        <Link to="/">cmsj</Link>
                    </h1>
                ) : (
                    <BackButton caption={caption} />
                )}

                {!hiddenHamberger && (
                    // iconBlackColor
                    //     ?
                    <HambergerButton className="" />
                        // : <HambergerButton className="text-subColor" />
                )
                }
            </div>
        </header>
    );
}
