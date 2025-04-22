import {useLoginState} from "../hooks/useLoginState";
import {useNavigate} from "react-router-dom";
import React, {useRef, useState} from "react";
import TailButton from "../UI/TailButton";
// import {useUserState} from "../hooks/useUserState";
import RegisterInput from "../components/RegisterInput";
import axios from "axios";
import md5 from "md5";
import {useSetRecoilState} from "recoil";
import {isLoggedInState, nicknameState, userIdState} from "../recoil/atoms";
import {toast} from "react-toastify";
import {validHash} from "../utils/validHash";
import {useLogin} from "../hooks/loginHnadler";


const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/User/register`//회원가입 폼 제출
const existIdUrl =  `${apiKey}/User/exist_id`;//아이디 중복 확인
console.log("API URL:", url);  // API URL이 정확한지 확인

export default function Register() {

    const idRef = useRef(null);
    const emailConfirmRef = useRef();

    const setIsLoggedIn = useSetRecoilState(isLoggedInState);
    const setUserId = useSetRecoilState(userIdState);
    const setNickname = useSetRecoilState(nicknameState);
    const navigate = useNavigate();
    const [isIdChecked, setIsIdChecked] = useState(false);//아이디 중복확인
    const [isEmailConfirmVisible, setIsEmailConfirmVisible] = useState(false);//인증번호 전송

    // 회원가입 입력 필드 상태
    const [formData, setFormData] = useState({//{...formData} 기존 formData 객체를 복사해서 새로운 객체를 만듦
        id: "",
        password: "",
        password_confirm: "",
        name: "",
        nickname: "",
        email: "",
        phone: "",
    });

    //  입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;

        // 아이디가 변경되면 중복확인 상태 초기화
        if (name === "id") {
            setIsIdChecked(false);
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

// ===================================================================================
    // 아이디 중복확인
    const existIdCheck = async (e) => {
        e.preventDefault(); // form submit 방지
        console.log("전송할 아이디 값 (formData.id):", formData.id);

        if(idRef.current.value === "") {
            alert("아이디를 입력하세요");
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("id", formData.id);

            const { data } = await axios.post(existIdUrl, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 5000,//5초
            });

            console.log("아이디 중복확인 응답:", data);

            if (data.result === "success") {
                alert("사용 가능한 아이디입니다!");
                setIsIdChecked(true); //  확인 완료
                console.log("아이디 중복 확인 완료",isIdChecked);
            } else {
                alert(data.msg || "이미 사용 중인 아이디입니다.");
                idRef.current.focus();
                setIsIdChecked(false); //  실패 시 상태 초기화
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


// ===================================================================================
    //인증번호 전송
    const sendAuthCode = async (e) => {
        e.preventDefault();


        // try {
        //     const params = new URLSearchParams();
        //     params.append("email", formData.email);
        //
        //     const { data } = await axios.post(, params, {
        //         headers: {
        //             "Content-Type": "application/x-www-form-urlencoded",
        //         },
        //         timeout: 5000,//5초
        //     });
        //
        //     console.log("인증번호 전송:", data);
        //
        //     if (data.result === "success") {
                    setIsEmailConfirmVisible(true);
                    emailConfirmRef.current.focus();//포커스 안되는 중,,,
        //
        //     } else {
        //         alert(data.msg || "인증번호를 보내지 못했습니다.");
        //
        //     }
        //
        // } catch (error) {
        //     if (error.code === 'ECONNABORTED') {
        //         console.error('요청 시간이 초과되었습니다!');
        //         alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
        //     } else {
        //         console.error("인증번호 전송 요청 에러:", error);
        //         alert("서버 오류가 발생했습니다.");
        //     }
        // }
    };


// ===================================================================================
    const login = useLogin();

    //회원가입 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (!formData.id || !formData.password || !formData.password_confirm || !formData.name || !formData.email || !formData.phone || !formData.nickname) {
        //     alert("필수값을 모두 입력해주세요!");
        //     return;
        // }

        if(!isIdChecked){
            alert("아이디 중복확인을 클릭해주세요");
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("id", formData.id);
            params.append("password", formData.password);
            params.append("password_confirm", formData.password_confirm);
            params.append("name", formData.name);
            params.append("email", formData.email);
            params.append("phone", formData.phone);
            params.append("nickname", formData.nickname);

            const { data } = await axios.post(url, params, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                timeout: 5000, //5초
            });

            console.log("회원가입 응답 데이터:", data);

            if (data.result === "success") {

                const { id, user_idx, time, auth, hash, nick_name } = data.code;
                const isValid = validHash(auth, time, hash);//해시 검증키

                if (!isValid) {
                    alert("회원가입 데이터 검증 실패! 위조 가능성 있음");
                    return;
                }

                // 검증 통과 → 자동 로그인 처리
                login({ id, user_idx, time, auth, hash, nick_name });

                alert("회원가입이 완료되었습니다!");

            } else {
                alert(data.msg || "회원가입 실패");
            }

        }  catch (error) {
            if (error.code === 'ECONNABORTED') {
                console.error('요청 시간이 초과되었습니다!');
                alert('서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.');
            } else {
                console.error("API 요청 에러:", error);
                alert("API 요청 에러");
            }
        }
    };

    return (
        <form className={`w-full px-4 pt-6 pb-8 bg-white SignUp`} >
            <div className={`w-full flex flex-col pt-2`}>
                <p className={`text-xs self-end pb-2`}><span className={`text-subColor2`}>*</span> 필수입력사항</p>
                <div className={`w-full h-[1px] bg-textBlack mb-4`}></div>
            </div>
            <RegisterInput
                label="아이디"
                type="text"
                name="id"
                value={formData.id}
                ref={idRef}
                onChange={handleChange}
                required
                inputPlaceholder="아이디를 입력해주세요"
                autoComplete="off"
                wrapClassName={`pb-4`}
            >
                <TailButton
                    type="button"
                    caption={`중복확인`}
                    handleClick={existIdCheck}
                    bcolor="btnBorder-subColor2"
                    className={`w-28 text-sm whitespace-nowrap ml-2`}
                />
            </RegisterInput>

            <RegisterInput
                label="비밀번호"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                inputPlaceholder="비밀번호를 입력해주세요"
                autoComplete="new-password"
                wrapClassName={`pb-4`}
            />

            <RegisterInput
                label="비밀번호 확인"
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                required
                inputPlaceholder="비밀번호를 다시 입력해주세요"
                autoComplete="new-password"
                wrapClassName={`pb-4`}
            />

            <RegisterInput
                label="이름"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                inputPlaceholder="이름을 입력해주세요"
                autoComplete="name"
                wrapClassName={`pb-4`}
            />

            <RegisterInput
                label="닉네임"
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
                maxLength="5"
                inputPlaceholder="닉네임을 입력해주세요(최대 5글자)"
                autoComplete="off"
                wrapClassName={`pb-4`}
            />

            {/*이메일*/}
            <RegisterInput
                label="이메일"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                inputPlaceholder="이메일을 입력해주세요"
                autoComplete="off"
                wrapClassName={`pb-2`}
            >
                <TailButton
                    type="button"
                    caption={`인증번호 전송`}
                    handleClick={sendAuthCode}
                    bcolor="btn-subColor2"
                    className={`w-28 text-sm whitespace-nowrap ml-2`}
                />
            </RegisterInput>

            {/*이메일 인증번호*/}
            <div className={` w-full flex items-center gap-2 pb-4 ${isEmailConfirmVisible ? '' : 'hidden'}`}>
                <input
                    type="text"
                    name="email_confirm"
                    value={formData.email_confirm}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    className="border border-transparent px-2 py-2 text-sm w-full bg-midGray"
                    placeholder="인증번호 (6자리)"
                    autoComplete="off"
                    ref={emailConfirmRef}
                />
                <TailButton
                    type="button"
                    caption={`인증하기`}
                    //handleClick={confirmCode} // 인증하기 클릭 시 실행 함수
                    bcolor="btn-LightBlack"
                    className={`w-28 text-sm whitespace-nowrap`}
                />
            </div>

            <RegisterInput
                label="휴대폰"
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                inputPlaceholder="숫자만 입력해주세요"
                autoComplete="off"
                wrapClassName={`pb-4`}
            />

            <TailButton
                type="button"
                caption={`가입하기`}
                bcolor="btn-subColor2"
                className={`w-full mt-2`}
                handleClick={handleSubmit}
            />
        </form>
    );
};