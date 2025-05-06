import { Swiper, SwiperSlide } from "swiper/react";


export default function TabMenu({ data, onClick, selTab, spaceBetween, slideClass="", btnClass="", tClass, fClass }) {
    return (
        <ul className={`w-full grid`}>
            {data.map(({ code, label }, idx) => (
                <li
                    key={idx}
                    // style={{ width: 'fit-content' }}
                    className={`${slideClass}`}
                >
                    <button
                        onClick={() => onClick(code)}
                        className={`px-3 py-1 rounded-full whitespace-nowrap text-sm ${btnClass} ${
                            selTab === code ? tClass : fClass
                        }`}
                    >
                        {label}
                    </button>
                </li>
            ))}
        </ul>
    );
};