
import {Routes, Route, Navigate} from "react-router-dom";
import Layout from "../layouts/Layout";
import PrivateRoute from "./PrivateRoute";

import Main from "../pages/main/Main";

import Login from "../pages/Login";

import Sell from "../pages/Sell";
import Register from "../pages/Register";

import Notice from "../pages/Notice";
import NoticeView from "../pages/NoticeView";
import Guide from "../pages/Guide";


import ExhibiGallery from "../pages/exhibition/ExhibiGallery";
import GuideGallery from "../pages/guide/GuideGallery";
import JejuFestival from "../pages/main/JejuFestival";
import ThemeGallery from "../pages/theme/ThemeGallery";
import MusicalGallery from "../pages/stage/MusicalGallery";
import MusicGallery from "../pages/stage/MusicGallery";
import GuideDetail from "../pages/guide/GuideDetail";
import PlayGallery from "../pages/stage/PlayGallery";
import KorMusic from "../pages/stage/KorMusic";
import AllSearch from "../pages/main/AllSearch";
import MainMenu from "../pages/main/MainMenu";


export default function RouteMain() {
    return (
        <Routes>

            <Route element={<Layout />}>{/* (공통 레이아웃) */}

                {/* 공개 페이지 */}

                {/* 메인 */}
                <Route path="/" element={<Main />} />
                <Route path="/mainSearch" element={<AllSearch />} />
                <Route path="/mainMenu" element={<MainMenu />} />


                {/*가이드*/}
                <Route path="/guide/gallery" element={<GuideGallery/>} />
                <Route path="/guide/gallery/detail" element={<GuideDetail />} />


                {/*테마*/}
                <Route path="/theme/gallery" element={<ThemeGallery/>} />

                {/*전시*/}
                <Route path="/stage/gallery/exhibition" element={<ExhibiGallery/>} />

                {/*뮤지컬*/}
                <Route path="/stage/gallery/musical" element={<MusicalGallery/>} />

                {/*연극*/}
                <Route path="/stage/gallery/play" element={<PlayGallery/>} />

                {/*국악*/}
                <Route path="/stage/gallery/korMusic" element={<KorMusic/>} />

                {/*연주회*/}
                <Route path="/stage/gallery/music" element={<MusicGallery/>} />

                {/*축제/행사*/}
                <Route path="/festival/gallery" element={<JejuFestival/>} />

                <Route path="/notice" element={<Notice />} />{/* 공지 */}
                <Route path="/notice/:id" element={<NoticeView />} />{/* 공지 뷰 */ }

                <Route path="/guide" element={<Guide/>} />{/* 이용가이드 */}

                <Route path="/login" element={<Login />} />{/* 로그인 */}
                <Route path="/register" element={<Register />} />{/* 회원가입 */}




                {/*  로그인한 사용자만 접근 가능 */}
                <Route element={<PrivateRoute />}>
                    <Route path="/sell" element={<Sell />} />{/* 동전팔기 */}


                </Route>

            </Route>
        </Routes>
    );
}

{/*<Route path="/rest" element={<Rest />} />*/}
