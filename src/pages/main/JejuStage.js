import TailButton from "../../UI/TailButton";
import {useNavigate} from "react-router-dom";
import InfoComponent6 from "../../components/InfoComponent6";
import SectionTitle from "../../components/SectionTitle";
import BorderComponent from "../../components/BorderComponent";
import { GiMusicalScore } from "react-icons/gi";
import {Autoplay} from "swiper/modules";
import data from "../../db/data.json";
import InfoComponent3 from "../../components/InfoComponent3";
import WFullButton from "../../components/WFullButton";
import {Swiper, SwiperSlide} from "swiper/react";

export default function JejuStage() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`/${code}/gallery?`);
    };

    return (
        <section className={`w-full border !overflow-visible`}>
            {/*섹션제목*/}
            <SectionTitle
                icon={<picture>
                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b6/512.webp" type="image/webp"/>
                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b6/512.gif" alt="🎶" width="25" height="25"/>
                </picture>}
                title={<>눈과 귀가 <span className={`text-mainColor`}>황홀한</span>순간</>}
            />

            <Swiper
                className={` !overflow-visible`}
                // modules={[Autoplay]}
                direction="horizontal"
                loop={true}  // 슬라이드 반복
                centeredSlides={true}  // 첫 슬라이드 중앙 정렬
                // initialSlide={0} //2번부터 시작
                spaceBetween={10}
                // slidesPerView={"auto"}  // 이 설정으로 슬라이드 크기 자동 조정!

                slidesPerView={1.5}
                slidesPerGroup={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                style={{ width: "100%", height: "fit-content" }}
                breakpoints={{
                    // 기본 화면 크기
                    // 320: {
                    //     slidesPerView: 1.5,
                    // },
                    // // 화면 크기가 480px 이상일 때
                    // 480: {
                    //     slidesPerView: 3,
                    // },
                    // // 화면 크기가 768px 이상일 때
                    // 768: {
                    //     slidesPerView: 3.5,
                    // },
                    // // 화면 크기가 1024px 이상일 때
                    // 1024: {
                    //     slidesPerView: 5.5,
                    // }
                }}
            >

                {/* 컨텐츠 박스 */}
                {data.jejuStageCategory.map((item, idx) => (
                    <SwiperSlide
                        key={idx}

                    >
                        <InfoComponent3
                            onClick={() => handleClick(item.code)}
                            icon_name={item.img}
                            title={item.label}
                            txt={item.txt}
                            wrapClass="h-48 rounded-xl"
                            imgClass="w-24 h-full shadow-fit rounded-br-[1.8rem] "
                            txtWrapClass="text-white font-bold text-sm relative z-2"
                            titleClass="font-semibold multi-ellipsis"
                            txtClass="font-normal multi-ellipsis"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </section>
    );
};