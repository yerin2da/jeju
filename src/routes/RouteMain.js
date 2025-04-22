
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
import MusicalGallery from "../pages/music/MusicalGallery";
import MusicGallery from "../pages/music/MusicGallery";


export default function RouteMain() {
    return (
        <Routes>

            <Route element={<Layout />}>{/* (공통 레이아웃) */}

                {/* 공개 페이지 */}

                {/* 메인 */}
                <Route path="/" element={<Main />} />

                {/*전시*/}
                <Route path="/exhibition/gallery" element={<ExhibiGallery/>} />

                {/*가이드*/}
                <Route path="/guide/gallery" element={<GuideGallery/>} />

                {/*테마*/}
                <Route path="/theme/gallery" element={<ThemeGallery/>} />

                {/*뮤지컬*/}
                <Route path="/musical/gallery" element={<MusicalGallery/>} />

                {/*연주회*/}
                <Route path="/music/gallery" element={<MusicGallery/>} />

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
