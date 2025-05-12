import {useNavigate, useParams} from "react-router-dom";
import { useRecoilValue } from "recoil";
import {useEffect, useState} from "react";
import axios from "axios";
import { categories } from "../constants/categories"; // 카테고리 import!
import { categoryState, pageState } from "../store/noticeState";
import TailButton from "../UI/TailButton";
import data from "../db/data.json";

// const noticeList = [
//     {
//         id: 1,
//         code: "system",
//         title: "서비스 일시 중단 안내",
//         date: "2024-03-10",
//         content: "서버 점검으로 인한 서비스 일시 중단 안내입니다.",
//     },
//     {
//         id: 2,
//         code: "update",
//         title: "시스템 개선 및 UI 개편 안내",
//         date: "2024-03-08",
//         content: "새로운 기능이 추가된 웹 업데이트가 완료되었습니다.",
//     },
//     {
//         id: 3,
//         code: "security",
//         title: "계정 보호를 위한 OTP 인증 필수 적용",
//         date: "2024-03-05",
//         content: "보안 강화를 위한 패치가 적용되었습니다.",
//     },
//     {
//         id: 4,
//         code: "etc",
//         title: "물찻오름 [출입제한 - 자연휴식년제 적용 중]",
//         date: "2024-03-01",
//         content: "물찻오름은 자연휴식년제 적용 중이오니 참고하시어 여행하시기바랍니다.",
//     },
//     {
//         id: 5,
//         code: "system",
//         title: "긴급 서버 점검",
//         date: "2024-02-28",
//         content: "긴급 서버 점검으로 인해 서비스가 중단됩니다.",
//     },
//     {
//         id: 6,
//         code: "update",
//         title: "UI 디자인 개선",
//         date: "2025-05-11",
//         content: "UI 디자인이 개선되어 더 나은 사용자 경험을 제공합니다.",
//     },{
//         id: 7,
//         code: "system",
//         title: "데이터베이스 최적화 작업",
//         date: "2025-05-09",
//         content: "데이터베이스 최적화 작업이 일부 완료되었습니다.",
//     },{
//         id: 8,
//         code: "system",
//         title: "사이트 개발 계획",
//         date: "2025-05-11",
//         content: "로그인 기능을 개발하여 찜하기, 내정보 서비스를 이용할 수 있도록 개선할 계획입니다.",
//     },{
//         id: 9,
//         code: "update",
//         title: "고객 피드백을 반영한 UI 개편",
//         date: "6",
//         content: "고객 피드백을 반영한 소규모 UI 개편이 완료되었습니다.",
//     },{
//         id: 10,
//         code: "etc",
//         title: "문석이오름 -[출입제한]",
//         date: "6",
//         content: "문석이오름은 출입제한이오니 참고하시어 여행하시기바랍니다.",
//     },
// ];
export default function NoticeView() {
    const url ="";
    const {id} = useParams();
    const selC1 = useRecoilValue(categoryState);  // 카테고리 값 가져오기
    const currentPage = useRecoilValue(pageState); // 페이지 값 가져오기
    const navigate = useNavigate();
    const [tdata, setTdata] = useState(data.noticeList); // 전체 데이터 (목록)

    //  3. 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const { data } = await axios.get(url);
            //     console.log("응답 데이터 구조 확인:", data);
            //     setTdata(data);
            // } catch (error) {
            //     console.warn("더미 데이터로 대체합니다.");
                setTdata(data.noticeList);
            // }
            // setTdata(noticeList);

        };

        fetchData();
    }, []);

    // tdata에서 id에 해당하는 글 찾기 (숫자형으로 변환 주의!)
    const notice = tdata.find(item => item.id === parseInt(id));

    return (

        <div className={`w-full h-full flex flex-col px-4 py-2`}>

            <div className={`border-b border-textLightGray pb-2 mb-2 flex flex-col gap-3`}>
                <p className="text-md font-normal">
                    [{data.guideCategory?.find(cat => cat.code === notice.code)?.label}]
                    <span className="pl-1">{notice.title}</span>
                </p>
                <p className={`text-xs xs:text-sm text-textDarkGray`}>{notice.date}</p>
            </div>


            <p className="text-sm xs:text-base break-all flex-1"> {notice.content}
            </p>

            <TailButton
                bcolor={`btn-mainColor`}
                handleClick={() => navigate("/notice")}
                caption={`목록으로`}
                className={`text-xs xs:text-sm mt-2`}
            />
            {/*<p>카테고리: {selC1}, 페이지: {currentPage}</p>*/}

        </div>

    );
};