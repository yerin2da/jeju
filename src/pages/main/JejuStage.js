import TailButton from "../../UI/TailButton";
import {useNavigate} from "react-router-dom";
import InfoComponent6 from "../../components/InfoComponent6";
import SectionTitle from "../../components/SectionTitle";
import BorderComponent from "../../components/BorderComponent";
import { GiMusicalScore } from "react-icons/gi";
import {Autoplay, Pagination} from "swiper/modules";
import data from "../../db/data.json";
import InfoComponent3 from "../../components/InfoComponent3";
import WFullButton from "../../components/WFullButton";
import {Swiper, SwiperSlide} from "swiper/react";
import InfoComponent7 from "../../components/InfoComponent7";

export default function JejuStage() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`/stage/gallery/${code}`);
    };

    return (
        <section className={` bg-mainBg w-screen max-w-screen-md -mx-5`}>
            {/*섹션제목*/}
            <SectionTitle
                className={`pl-5`}
                icon={<picture>
                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b6/512.webp" type="image/webp"/>
                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3b6/512.gif" alt="🎶" width="25" height="25"/>
                </picture>}
                title={<>눈과 귀가 <span className={`text-mainColor`}>황홀한</span>순간</>}
            />
            <div className={`px-5`}>
                <Swiper
                    className={` w-full h-full`}
                    modules={[Pagination]}
                    direction="horizontal"
                    loop={true}  // 슬라이드 반복
                    centeredSlides={true}  // 첫 슬라이드 중앙 정렬
                    spaceBetween={10}
                    slidesPerView={"auto"}  // 이 설정으로 슬라이드 크기 자동 조정!
                    slidesPerGroup={1}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    pagination={{
                        clickable: true, // 동그라미 클릭 가능!
                    }}
                >

                    {/* 컨텐츠 박스 */}
                    {data.jejuStageCategory.slice(0,3).map((item, idx) => (
                        <SwiperSlide key={idx}>
                            <InfoComponent7
                                onClick={() => handleClick(item.code)}
                                icon_name={item.img}
                                title={item.label}
                                txt={item.txt}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};