import { Swiper, SwiperSlide } from "swiper/react";


export default function TabMenuSlider({ data, onClick, selTab, spaceBetween, slideClass="", btnClass="", tClass, fClass }) {
    return (
        <Swiper
            spaceBetween={spaceBetween}
            slidesPerView="auto"
        >
            {data.map(({ code, label }, idx) => (
                <SwiperSlide
                    key={idx}
                    style={{ width: 'fit-content' }}
                    className={`${slideClass}`}
                >
                    <button
                        onClick={() => onClick(code)}
                        className={`px-4 py-2 font-semibold rounded-full whitespace-nowrap text-base ${btnClass} ${
                            selTab === code ? tClass : fClass
                        }`}
                    >
                        {label}
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};