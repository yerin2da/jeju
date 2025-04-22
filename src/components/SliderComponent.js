import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Swiper 기본 스타일 가져오기
import "swiper/css/pagination"; // 페이지네이션 스타일
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import LiveCurrency from "./LiveCurrency";
import axios from "axios";
import { useEffect, useState } from "react";
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5";

const apiKey = process.env.REACT_APP_API_BASE_URL;
const url = `${apiKey}/Trade/realExchange`
console.log("API URL:", url);  // API URL이 정확한지 확인

export default function SliderComponent() {

    const [tdata, setTdata] = useState([]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(url);
                console.log("실시간 환율 받은 데이터:", data);  // 데이터를 콘솔에 출력

                if (data.result === "success") {
                    setTdata(data.code);
                } else {
                    console.log(data.msg || "실패");
                }
            } catch (error) {
                console.error("API 요청 에러:", error);
            }
        };

        fetchData(); // 데이터 가져오기 함수 호출
    }, []);

    // exchange 배열을 4개씩 묶어서 groupedRates 생성
    const groupedRates = [];

    for (let i = 0; i < tdata.length; i += 4) {
        groupedRates.push(tdata.slice(i, i + 4));
    }


    return (
        <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20} // 슬라이드 간격
            slidesPerView={1} // 한 번에 하나의 블록(4개 묶음)만 보이게 설정
            slidesPerGroup={1} // 하나의 블록 단위로 슬라이드 이동
            pagination={{
                clickable: true,
            }}
            navigation
            autoplay={{
                delay: 3000, // 3초마다 자동 슬라이드
                disableOnInteraction: false, // 사용자 조작 후에도 자동 슬라이드 유지
            }}
            style={{ width: "100%", height: "450px" }} // Swiper 크기 조정
            className="custom-swiper"
        >
            {groupedRates.map((group, index) => (
                <SwiperSlide
                    key={index}
                >
                    <div className="flex flex-col gap-2">
                        {group.map((item, index) => {
                           return (
                                <LiveCurrency
                                    key={index}
                                    name={item.name}
                                    code={item.code}
                                    exchange={item.exchange}
                                    updown={item.updown}
                                    point={item.point}
                                />
                            );
                        })}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );

};