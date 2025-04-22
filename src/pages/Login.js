// import {useLoginState} from "../hooks/useLoginState";
import { useSetRecoilState } from 'recoil';
import { isLoggedInState, userIdState, nicknameState } from '../recoil/atoms';
import { useNavigate} from "react-router-dom";
import TailButton from "../UI/TailButton";
import {useState} from "react";
import axios from "axios";
import ToggleCheckIcon from "../components/ToggleCheckIcon";

import { validHash } from '../utils/validHash';
import {useLogin} from "../hooks/loginHnadler";

const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/User/login`
console.log("API URL:", url);  // API URL이 정확한지 확인

export default function Login() {

    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const setUserId = useSetRecoilState(userIdState);
    const setNickname = useSetRecoilState(nicknameState);

    const navigate = useNavigate();

    //'아이디 저장' 체크 상태 관리
    const [rememberUsername, setRememberUsername] = useState(false);
    const handleRememberChange = () => {
        setRememberUsername(!rememberUsername);
    };

    // 로그인 입력 필드 상태
    const [formData, setFormData] = useState({
        user_id:"",
        user_pwd:"",
    });

    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const login = useLogin();
    const handleLogin = async (e) => {

        e.preventDefault();
        if (!formData.user_id || !formData.user_pwd) {
            alert("아이디와 비밀번호를 입력하세요!");
            return;
        }

        try {

            const { data } = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 5000,//5초
            });

            console.log("로그인 응답 데이터:", data);

            if (data.result === "success") {

                const { id, user_idx, time, auth, hash, nick_name } = data.code;
                const isValid = validHash(auth, time, hash);//해시 검증키

                if (!isValid) {
                    alert("데이터 위조 감지! 검증 실패");
                    setFormData({
                        user_id: rememberUsername ? formData.user_id : "",
                        user_pwd: "",
                    });
                    return;
                }

                // 검증 통과 → 로그인 처리
                login({ id, user_idx, time, auth, hash, nick_name });


            }else{

                alert(data.msg || "아이디 또는 비밀번호가 틀렸습니다.");
                setFormData({
                    user_id: rememberUsername ? formData.user_id : "",
                    user_pwd: "",
                });
                return;
            }

        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.error('요청 시간이 초과되었습니다!');
                alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
            } else {
                console.error("API 요청 에러:", error);
                alert("서버 오류가 발생했습니다.");
            }
        }
    };

    return (
        <form className={`w-full flex flex-col justify-center px-4 bg-white py-16 Login`}>
            <p className={`text-3xl font-semibold pb-20 text-center`}>로그인</p>

            {/* 아이디 입력 필드 */}
            <input
                type="text"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                placeholder="아이디를 입력해주세요"
                className="w-full mb-2"
                autoComplete="off"
            />

            {/* 비밀번호 입력 필드 */}
            <input
                type="password"
                name="user_pwd"
                value={formData.user_pwd}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleLogin(e);
                }}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
                className=" w-full mb-2"
            />

            <div className={`w-full flex items-center justify-between pb-6`}>
                <div className={`text-sm flex items-center gap-2`}>
                    <div className="text-sm flex items-center gap-1">
                        <ToggleCheckIcon isChecked={rememberUsername}
                                         onClick={handleRememberChange}
                                         className={`text-lg cursor-pointer`}
                                         btnColor="subColor2"
                        />
                        <span className="my-2">아이디 저장</span>
                    </div>
                </div>

                <div className={`flex items-center gap-4`}>
                    <p className={`text-sm cursor-pointer`}>아이디 찾기</p>
                    <p className={`text-sm cursor-pointer`}>비밀번호 찾기</p>
                </div>
            </div>

            <TailButton
                caption="로그인"
                handleClick={handleLogin}
                bcolor="btn-subColor2"
                className={`w-full mb-2`}
            />

            <TailButton
                caption="회원가입"
                handleClick={() => navigate("/register")}
                bcolor="btnBorder-subColor2"
                className={`w-full mb-6`}
            />

            <div className={`flex flex-col items-center justify-center`}>
                <p>간편로그인</p>

                <div className={`flex items-center gap-2`}>
                    <p>카카오</p>
                    <p>네이버</p>
                    <p>구글</p>
                </div>
            </div>

        </form>
    );
};