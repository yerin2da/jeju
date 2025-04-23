import Header from "./Header";
import MainBar from "./MainBar";
import { Outlet, useLocation } from "react-router-dom";
import RandomDiagram from "../components/RandomDiagram";

export default function Layout() {
    const location = useLocation();

    // 로그인, 회원가입 페이지에서는 MainBar 숨김
    const hiddenMainBar = ["/login", "/register"].includes(location.pathname);


    return (
        <div className="flex flex-col w-full h-screen max-w-screen-md mx-auto border-l border-r  border-gray-100">
            <Header />

            <main
                className={`w-full p-5 overflow-y-auto scrollbar-hide h-full border bg-white overflow-x-hidden`} >
                {/* ${*/}
                {/* !hiddenMainBar ? "mb-[96px] bg-mainBg " : "bg-white"*/}
                {/* }*/}

                <Outlet/> {/* 각 페이지 렌더링 */}
            </main>

            {!hiddenMainBar && <MainBar />}
            {/*<RandomDiagram/>*/}
        </div>
    );
}
