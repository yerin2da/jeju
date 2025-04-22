import TailButton from "../UI/TailButton";
import Typography from "../components/Typography";
import { useState } from "react";
import { useRecoilValue } from 'recoil';
import { nicknameState } from '../recoil/atoms';
import { useLogout } from '../hooks/logoutHandler';

export default function MyPage() {
    const nickname = useRecoilValue(nicknameState);

    const logout = useLogout(); // ✅ 훅 호출해서 logout 함수 가져오기

    const handleLogout = () => {
        logout('/'); // ✅ 로그아웃 후 메인으로 이동
    }

    const [count, setCount] = useState(0);

    return (
        <div>
            <Typography as={`h4`} variant="h4">
                안녕하세요! <span className="font-bold">{nickname}</span>님 👋
            </Typography>

            <TailButton
                caption="로그아웃"
                handleClick={handleLogout}
                bcolor="btn-mainColor">
            </TailButton>

            <div>
                <h1>핫 리로딩 test</h1>
                <p>카운트: {count}</p>
                <button onClick={() => setCount(count + 1)}>증가</button>
            </div>
        </div>
    );
}
