import { useEffect } from 'react';
import {matchPath, useLocation} from 'react-router-dom';
import { toast } from 'react-toastify';
import { validHash } from '../utils/validHash';
import { useLogout } from './logoutHandler';

export default function AuthWatcher() {//로컬 auth값 변경시 로그아웃
    const location = useLocation();

    const logout = useLogout(); //  로그아웃 함수 호출(스토리지, 리코일 초기화)

    useEffect(() => {

        const checkStorage = () => {
            // 아래 페이지는 체크하지 않음
            const path = location.pathname;
            if (
                [
                    "/",
                    "/notice",
                    "/notice/:id",
                    "/login",
                    "/register",
                    "/buy",

                    "/guide",
                    "/guide/gallery",
                    "/guide/gallery/:category",
                    "/guide/gallery/:category/:cid",

                    "/stage/gallery/exhibition",
                    "/stage/gallery/musical",
                    "/stage/gallery/play",
                    "/stage/gallery/korMusic",
                    "/stage/gallery/music",

                    "/theme/gallery",
                    "/theme/gallery/:category",

                    "/mainSearch",
                    "/mainMenu"

                ].includes(path)
                || matchPath("/notice/:id", path)
                || matchPath("/guide/gallery/:category/:cid", path)
                ||matchPath("/guide/gallery/:category", path)
                ||matchPath("/theme/gallery/:category", path)
            ) {
                return;
            }

            const storageAuth = localStorage.getItem('auth');
            const storedHash = localStorage.getItem('hash');
            const storedTime = localStorage.getItem('time');

            // 값이 없으면 로그아웃!
            if (!storageAuth || !storedTime || !storedHash) {
                alert("스토리지 값 없음. 로그인 다시 하세요.");
                logout('/login');
                return;
            }

            const isValid = validHash(storageAuth, storedTime, storedHash);
            if (!isValid) {
                // toast.error('인증 정보가 변경되었습니다. 다시 로그인하세요.');

                alert("해시 검증 실패. 로그아웃 진행.");
                logout('/login');
            }
        };

        checkStorage();
        // const interval = setInterval(checkStorage, 3000);
        // return () => clearInterval(interval);
    }, [location.pathname]);
}
