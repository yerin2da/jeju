
import React from 'react';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import AuthWatcher from './hooks/AuthWatcher';
import RouteMain from './routes/RouteMain';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {APIProvider} from '@vis.gl/react-google-maps';
import LoginExpireWatcher from "./hooks/LoginExpireWatcher";


const url = process.env.REACT_APP_API_MAP_KEY;//구글맵

function App() {
    return (
        <HashRouter>

            <APIProvider apiKey={url}>
                <RecoilRoot>
                        <AuthWatcher /> {/* 페이지 이동시 auth 감시 */}
                        <LoginExpireWatcher/>{/* 로그인 유효시간 만료 감시 */}

                        {/* 전역 알림 */}
                        {/*<ToastContainer*/}
                        {/*    position="top-center"*/}
                        {/*    autoClose={3000}*/}
                        {/*    hideProgressBar={false}*/}
                        {/*    closeOnClick*/}
                        {/*    pauseOnHover*/}
                        {/*    draggable*/}
                        {/*/>*/}


                        {/* 전체 라우트 관리 */}
                        <RouteMain />
                </RecoilRoot>
            </APIProvider>
        </HashRouter>

    );
}

export default App;
