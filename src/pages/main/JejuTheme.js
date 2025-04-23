import SectionTitle from "../../components/SectionTitle";
import { useNavigate} from "react-router-dom";
import data from "../../db/data.json";
import InfoComponent3 from "../../components/InfoComponent3";
import {Autoplay} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

export default function JejuTheme() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`theme/gallery?category=${code}`);
    };

    return (
        <section className={``}>
            {/*섹션제목*/}
            <SectionTitle
                icon={`🌿`}
                title={<>이런 <span className={`text-mainColor`}>여행</span>어때요?</>}
            />
            <Swiper
                className={` -mx-5 !overflow-visible`}
                modules={[Autoplay]}
                direction="horizontal"
                loop={false}  // 슬라이드 반복
                spaceBetween={10}
                slidesPerView={2.5}
                slidesPerGroup={1}
                autoplay={{
                    delay: 8000,
                    disableOnInteraction: false
                }}
                style={{ width: "100%", height: "fit-content" }}
                breakpoints={{
                    // 기본 화면 크기
                    320: {
                        slidesPerView: 2.5,
                    },
                    // 화면 크기가 480px 이상일 때
                    480: {
                        slidesPerView: 3.5,
                    },
                    // 화면 크기가 768px 이상일 때
                    768: {
                        slidesPerView: 4.5,
                    },
                    // 화면 크기가 1024px 이상일 때
                    1024: {
                        slidesPerView: 5.5,
                    }
                }}
            >

            {/* 컨텐츠 박스 */}
            {data.jejuThemeCategory.map((item, idx) => (
                <SwiperSlide key={idx}>
                    <InfoComponent3
                        onClick={() => handleClick(item.code)}
                        icon_name={item.img}
                        title={item.label} 
                        txt={item.txt}
                        wrapClass=" h-36 xs:h-40 rounded-xl"
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