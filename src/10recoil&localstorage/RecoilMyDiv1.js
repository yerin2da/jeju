// import RecoilMyDiv2 from "./RecoilMyDiv2";
// import {useRecoilState, useRecoilValue} from "recoil";
// import {AtomN, AtomN2} from "./AtomN";
// import {useEffect} from "react";
//
// export default function RecoilMyDiv1() {
//
//     const d1 = "div1";
//     const d2 = "div2";
//     const d3 = "div3";
//
//     const [n, setN] = useRecoilState(AtomN);
//     const n2 = useRecoilValue(AtomN2);
//
//     useEffect(()=>{
//
//         if(localStorage.getItem('n')){
//             setN(parseInt(localStorage.getItem('n'), 10));
//         }
//     },[])
//     return (
//         <div className="flex flex-col p-5 justify-center items-center w-2/3 h-2/3 text-2xl bg-lime-900 text-white border-gray-950
//
//         ">
//             <div className="w-full h-10 flex justify-start items-center">
//                 {d1} : recoil 변수 n = {n}, n2 = {n2}
//             </div>
//
//             <RecoilMyDiv2 dn1={d1} dn2={d2} dn3={d3} />
//         </div>
//     );
// };