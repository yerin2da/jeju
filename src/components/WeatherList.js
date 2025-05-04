import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function WeatherList({ data }) {
    const categoryMap = {
        PTY: '강수형태',
        T1H: '기온',
        SKY: '하늘'
    };

    const rainMap = {
        '1': '🌧️',
        '2': '🌨️',
        '3': '❄️',
        '4': '🌦️',
        '5': '💧',
        '6': '🌨️',
        '7': '❄️'
    };

    const skyMap = {
        '1': '☀️',
        '3': '⛅',
        '4': '☁️'
    };

    const getClosestTimeWeather = (weather) => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentTime = currentHour * 100;

        const times = weather.map(w => Number(w.fcstTime));
        const closestTime = times.reduce((prev, curr) =>
            Math.abs(curr - currentTime) < Math.abs(prev - currentTime) ? curr : prev
        );

        return weather.filter(
            w => Number(w.fcstTime) === closestTime &&
                Object.keys(categoryMap).includes(w.category)
        );
    };

    return (
        <div className="w-full h-20 bg-white contentsBox !px-3 !py-0 !m-0">
            <Swiper
                modules={[Autoplay]}
                direction="vertical"
                loop={true}  // 슬라이드 반복
                spaceBetween={0}
                slidesPerView={1}
                slidesPerGroup={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
                style={{ width: "100%", height: "80px" }}
            >
                {data.map((item, idx) => {
                    if (!item.weather || !Array.isArray(item.weather)) return null;

                    const closest = getClosestTimeWeather(item.weather);
                    const PTY = closest.find(w => w.category === 'PTY');
                    const SKY = closest.find(w => w.category === 'SKY');
                    const TEMP = closest.find(w => w.category === 'T1H');

                    const getIcon = () => {
                        if (!PTY || !SKY) return ;
                        return PTY.fcstValue === '0'
                            ? skyMap[SKY.fcstValue] || '☁️'
                            : rainMap[PTY.fcstValue] || '🌧️';
                    };

                    const getDescription = () => {
                        if (!PTY || !SKY) return '날씨 정보 없음';

                        if (PTY.fcstValue === '0') {
                            return SKY.fcstValue === '1' ? '맑음' :
                                SKY.fcstValue === '3' ? '구름 많음' :
                                    SKY.fcstValue === '4' ? '흐림' : '알 수 없음';
                        } else {
                            return PTY.fcstValue === '1' ? '비' :
                                PTY.fcstValue === '2' ? '비/눈' :
                                PTY.fcstValue === '3' ? '눈' :
                                PTY.fcstValue === '4' ? '소나기' :
                                PTY.fcstValue === '5' ? '빗방울' :
                                PTY.fcstValue === '6' ? '빗방울/눈날림' :
                                PTY.fcstValue === '7' ? '눈날림' : '강수';
                        }
                    };

                    return (
                        <SwiperSlide key={idx}>
                            <div className="h-20 flex items-center justify-between">
                                {/* 왼쪽: 날씨 아이콘과 설명 */}
                                <div className="flex items-center gap-3">
                                    {/*아이콘*/}
                                    <div className="text-3xl">{getIcon()}</div>

                                    <div className="text-sm ">
                                        <p className="">{item.location} 날씨</p>
                                        <p className="text-gray-500">{getDescription()}</p>
                                    </div>
                                </div>

                                {/* 오른쪽: 기온 */}
                                <div className="text-xl font-medium text-gray-700 flex items-start">
                                    {TEMP?.fcstValue || '-'}<span className={`text-sm font-normal`}>℃</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
