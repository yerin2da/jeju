import { useEffect } from "react";
import { useLogout } from "./logoutHandler";

{/* 로그인 유효시간 만료 감시 */}
export default function LoginExpireWatcher() {
    const logout = useLogout();

    useEffect(() => {
        const expireTimeStr = localStorage.getItem("time");
        if (!expireTimeStr) return;

    // 테스트용: 지금부터 2분 후로 강제 설정
        // const expireTime = new Date(new Date().getTime() + 2 * 60 * 1000);//2분 뒤

        const expireTime = new Date(expireTimeStr.replace(" ", "T"));

        const now = new Date();//현재시간
        const untilExpire = expireTime.getTime() - now.getTime();//남은 시간

        // 1.이미 만료된 이후 자동 로그아웃
        if (untilExpire <= 0) {
            alert("유효시간이 만료되어 자동 로그아웃 되었습니다. 다시 로그인 해주세요");
            logout("/login");
            return;
        }

        // 2. 만료 1분 전 경고 타이머
        const warningMs = untilExpire - 60 * 1000;
        let warningTimeout;
        if (warningMs > 0) {
            warningTimeout = setTimeout(() => {
                alert("⏳ 로그인 유효시간이 1분 남았습니다!");
            }, warningMs);
        }
        
        // 3. 유효시간되면 자동 로그아웃 예약
        const timeout = setTimeout(() => {
            alert("유효시간이 만료되어 자동 로그아웃 되었습니다. 다시 로그인 해주세요");
            logout("/login");
        }, untilExpire);

        // 4. 타이머 정리
        return () => {
            clearTimeout(warningTimeout);
            clearTimeout(timeout);
        };
    }, [logout]);

    return null;
}
