import {useNavigate, useParams} from "react-router-dom";
import { useRecoilValue } from "recoil";
import {useEffect, useState} from "react";
import axios from "axios";
import { categories } from "../constants/categories"; // 카테고리 import!
import { categoryState, pageState } from "../store/noticeState";
import TailButton from "../UI/TailButton";
import data from "../db/data.json";

const noticeList = [
    {
        id: 1,
        code: "system",
        title: "거래 요청 및 채팅 서비스 일시 중단 안내",
        date: "2024-03-10",
        content: "서버 점검으로 인한 서비스 일시 중단 안내입니다.",
    },
    {
        id: 2,
        code: "update",
        title: "거래 후기 시스템 개선 및 UI 개편 안내",
        date: "2024-03-08",
        content: "새로운 기능이 추가된 앱 업데이트가 완료되었습니다.",
    },
    {
        id: 3,
        code: "security",
        title: "계정 보호를 위한 OTP 인증 필수 적용",
        date: "2024-03-05",
        content: "보안 강화를 위한 패치가 적용되었습니다.",
    },
    {
        id: 4,
        code: "etc",
        title: "외화 등록 후 거래 대기 시간 변경",
        date: "2024-03-01",
        content: "기타 공지사항 내용을 확인해 주세요.",
    },
    {
        id: 5,
        code: "system",
        title: "긴급 서버 점검",
        date: "2024-02-28",
        content: "긴급 서버 점검으로 인해 서비스가 중단됩니다.",
    },
    {
        id: 6,
        code: "system",
        title: "6",
        date: "6",
        content: "6",
    },{
        id: 7,
        code: "system",
        title: "7",
        date: "6",
        content: "6",
    },{
        id: 8,
        code: "system",
        title: "8",
        date: "6",
        content: "6",
    },{
        id: 9,
        code: "system",
        title: "9",
        date: "6",
        content: "6",
    },{
        id: 10,
        code: "system",
        title: "10",
        date: "6",
        content: "6",
    },
];
export default function NoticeView() {
    const url ="";
    const {id} = useParams();
    const selC1 = useRecoilValue(categoryState);  // 카테고리 값 가져오기
    const currentPage = useRecoilValue(pageState); // 페이지 값 가져오기
    const navigate = useNavigate();
    const [tdata, setTdata] = useState(noticeList); // 전체 데이터 (목록)

    //  3. 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            // try {
            //     const { data } = await axios.get(url);
            //     console.log("응답 데이터 구조 확인:", data);
            //     setTdata(data);
            // } catch (error) {
            //     console.warn("더미 데이터로 대체합니다.");
            //     setTdata(noticeList);
            // }
            setTdata(noticeList);

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