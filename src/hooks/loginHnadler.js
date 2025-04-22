// useLogin.js
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userIdState, nicknameState } from '../recoil/atoms';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const setUserId = useSetRecoilState(userIdState);
    const setNickname = useSetRecoilState(nicknameState);
    const navigate = useNavigate();

    const login = ({ id, user_idx, nick_name, auth, hash, time }, redirectPath = "/") => {
        // ✅ localStorage 저장
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("id", id);
        localStorage.setItem("nick_name", nick_name);
        localStorage.setItem("auth", auth);
        localStorage.setItem("hash", hash);
        localStorage.setItem("time", time);
        localStorage.setItem("user_idx", user_idx);

        // ✅ Recoil 상태 설정
        setIsLoggedIn(true);
        setUserId(id);
        setNickname(nick_name);

        // ✅ 이동
        navigate(redirectPath, { replace: true });//뒤로가기 시 로그인페이지 안 나오게
    };

    return login;
};
