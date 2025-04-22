import {useLoginState} from "../hooks/useLoginState";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import TailButton from "../UI/TailButton";
// import {useUserState} from "../hooks/useUserState";
import SignupInput from "../components/SignupInput";
import axios from "axios";


const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/User/register`
console.log("API URL:", url);  // API URL이 정확한지 확인

export default function SignUp() {
    const {setIsLoggedIn} = useLoginState();
    // const {setNickname} = useUserState();
    const navigate = useNavigate();

    // ✅ 회원가입 입력 필드 상태
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
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    //회원가입 폼 제출 핸들러
    const handleSubmit = async () => {
        if (!formData.id || !formData.password || !formData.password_confirm || !formData.name || !formData.nickname || !formData.phone || !formData.email) {
            alert("필수값을 모두 입력해주세요!");
            return;
        }

        try {

            const { data } = await axios.post(url, formData,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            console.log("회원가입 받은 데이터:", data);

            if (data.result === "success") {
                setIsLoggedIn(true);
                navigate("/");
            } else {
                alert(data.msg || "회원가입 실패");
            }

        } catch (error) {
            console.error("API 요청 에러:", error);
            alert("서버 오류 발생");
        }
    };



    return (
        <div className={`w-full px-5 flex flex-col justify-center items-center bg-white`}>
            <p className={`text-3xl font-semibold pb-20`}>회원가입</p>
            <div className={`w-full flex flex-col`}>
                <p className={`text-xs self-end pb-2`}><span className={`text-subColor2`}>*</span> 필수입력사항</p>
                <div className={`w-full h-[1px] bg-textBlack mb-4`}></div>
            </div>
            {/*<form id="signupForm" className={`w-full`}>*/}
            <SignupInput
                    label="아이디"
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    required
                    inputPlaceholder="아이디를 입력해주세요"
                    autoComplete="off"
                >
                    <TailButton
                        type="button"
                        caption={`중복확인`}
                        bcolor="btnBorder-subColor2"
                        className={`w-28 text-sm`}
                    />
                </SignupInput>

                <SignupInput
                    label="비밀번호"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    inputPlaceholder="비밀번호를 입력해주세요"
                    autoComplete="new-password"
                />

                <SignupInput
                    label="비밀번호 확인"
                    type="password"
                    name="password_confirm"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    required
                    inputPlaceholder="비밀번호를 다시 입력해주세요"
                    autoComplete="off"
                />

                <SignupInput
                    label="이름"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    inputPlaceholder="이름을 입력해주세요"
                    autoComplete="off"
                />

                <SignupInput
                    label="닉네임"
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    maxLength="5"
                    inputPlaceholder="닉네임을 입력해주세요(최대 5글자)"
                    autoComplete="off"
                />

                <SignupInput
                    label="이메일"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    inputPlaceholder="이메일을 입력해주세요"
                    autoComplete="off"
                />

                <SignupInput
                    label="휴대폰"
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    inputPlaceholder="숫자만 입력해주세요"
                    autoComplete="off"
                >
                    <TailButton
                        type="button"
                        caption={`인증하기`}
                        bcolor="btnBorder-subColor2"
                        className={`w-28 text-sm`}
                    />
                </SignupInput>

                <TailButton
                    type="button"
                    caption={`가입하기`}
                    bcolor="btn-subColor2"
                    className={`w-full mb-6 mt-2`}
                    handleClick={handleSubmit}
                />
            {/*</form>*/}
        </div>
    );
};