// //로그인 상태 전역관리
// import {createContext, useContext, useState, useEffect} from "react";
//
// const LoginContext = createContext();
//
//
// export function LoginProvider({children}) {
//
//     // localStorage에서 로그인 상태 가져오기
//     const [isLoggedIn, setIsLoggedIn] = useState(() => {
//         return localStorage.getItem("isLoggedIn") === "true";//로그인한 상태(true)를 localStorage에 저장해 두고, 새로고침할 때 다시 가져와서 유지하는 것!// localStorage.getItem("isLoggedIn")을 가져와서, "true"라는 문자열과 비교 // true이면 로그인 상태 유지 (isLoggedIn = true)
//     });
//     // 로그인 상태가 변경될 때 localStorage에 저장
//     useEffect(()=>{
//         localStorage.setItem("isLoggedIn", isLoggedIn);
//     }, [isLoggedIn]);
//
//
//     //아이디 값
//     const [userId, setUserId] = useState(() => {
//         return localStorage.getItem("userId")  || null;
//     });
//     // 아이디 변경될 때마다 저장
//     useEffect(() => {
//         localStorage.setItem("userId", userId);
//     }, [userId])
//
//
//     // 닉네임 상태
//     const [nickname, setNickname] = useState(() => {
//         return localStorage.getItem("nick_name") || null;
//     });
//
//     useEffect(() => {
//         localStorage.setItem("nick_name", nickname);
//     }, [nickname]);
//
//     return (
//         <LoginContext.Provider
//             value={{isLoggedIn, setIsLoggedIn, userId, setUserId, nickname,
//                 setNickname }}>  {/*value={{isLoggedIn, setIsLoggedIn}}: → isLoggedIn (로그인 여부)와 setIsLoggedIn (로그인 상태 변경 함수)를 모든 하위 컴포넌트에서 접근 가능하게 만듦.*/}
//             {children}
//         </LoginContext.Provider>
//     );
// }
// export function useLoginState() {
//     return useContext(LoginContext);
// }