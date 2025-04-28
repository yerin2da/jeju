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

        "/exhibition/gallery":"제주 BEST 전시",
        "/guide/gallery":"여행 가이드",
        "/guide/gallery/:category":"여행 가이드",
        "/guide/gallery/:category/:cid":"상세 정보",
        "/musical/gallery":"뮤지컬 모음",
        "/music/gallery":"음악 모음",
        "/play/gallery":"연극 모음",
        "/korMusic/gallery":"국악 모음",
        "/theme/gallery":"테마 여행",
    };

    // 캡션 자동 매칭
    let caption = captions[currentPath]; // 정확히 일치하는 경로 먼저 찾기
    if (!caption) {// 못 찾았으면
        for (const path in captions) {// captions의 모든 경로 순회!
            if (matchPath({ path, end: true }, currentPath)) {// matchPath로 비교 - matchPath("/guide/gallery/:category", "/guide/gallery/c1")
                caption = captions[path];// 찾으면 caption 설정
                break;
            }
        }
    }

    const showLogo = ["/", "/mypage"].includes(currentPath);

    const bgBlack = ["/findCurrency", "/buy"].includes(currentPath);//헤더 블랙

    const hiddenHamberger = ["/login", "/register"].includes(currentPath);




    return (

        <header className={`w-full text-2xl h-20 pr-6 pl-3 py-11 sticky top-0 left-0 z-[9999] 
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
