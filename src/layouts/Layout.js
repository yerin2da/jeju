import Header from "./Header";
import MainBar from "./MainBar";
import {matchPath, Outlet, useLocation} from "react-router-dom";
import RandomDiagram from "../components/RandomDiagram";

export default function Layout() {
    const location = useLocation();

    // 로그인, 회원가입 페이지에서는 MainBar 숨김
    const hiddenMainBar = ["/login", "/register"].includes(location.pathname);

    const path = location.pathname;
    // 제주가이드, 제주테마, 공지사항에서만 !pt-0
    const pt0 = ["/guide/gallery/:category", "/theme/gallery/:category", "/notice"].includes(path)
        ||matchPath("/guide/gallery/:category", path)
        ||matchPath("/theme/gallery/:category", path);


    return (
        <div className="flex flex-col w-full h-screen max-w-screen-md mx-auto border-l border-r border-gray-100">
            <Header />

            <main
                className={`w-full p-5 overflow-y-auto scrollbar-hide h-full border bg-white overflow-x-hidden
                 ${!hiddenMainBar ? "mb-[70px] " : ""}
                 ${pt0 ? "!py-0 !pb-5 " : ""}
                 
                 `}>

                <Outlet/> {/* 각 페이지 렌더링 */}
            </main>

            {!hiddenMainBar && <MainBar />}
            {/*<RandomDiagram/>*/}
        </div>
    );
}
