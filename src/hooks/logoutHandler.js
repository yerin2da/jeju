import { isLoggedInState, userIdState, nicknameState } from '../recoil/atoms';
import { useResetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

// ✅ 공통 로그아웃 훅
export const useLogout = () => {
    const resetIsLoggedIn = useResetRecoilState(isLoggedInState);
    const resetUserId = useResetRecoilState(userIdState);
    const resetNickname = useResetRecoilState(nicknameState);
    const navigate = useNavigate();

    const logout = (redirectPath = '/') => {
        //  Recoil 상태 초기화
        resetIsLoggedIn();
        resetUserId();
        resetNickname();

        //  로컬/세션 스토리지 클리어
        // localStorage.clear();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("auth");
        localStorage.removeItem("hash");
        localStorage.removeItem("time");
        localStorage.removeItem("id");
        localStorage.removeItem("user_idx");
        localStorage.removeItem("nick_name");

        // recoil-persist에 저장된 상태도 삭제하고 싶으면 아래 추가
        localStorage.removeItem("recoil-persist");


        //  페이지 이동
        navigate(redirectPath, { replace: true });
    };

    return logout;
};
