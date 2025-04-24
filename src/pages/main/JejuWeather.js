
import {useEffect, useState} from 'react';
import axios from "axios";
import WeatherList from "../../components/WeatherList";


const apiKey = process.env.REACT_APP_API_KEY;
let url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?`
    url = `${url}serviceKey=${apiKey}`
    url = `${url}&dataType=json`
    url = `${url}&numOfRows=100&pageNo=1`
    url = `${url}&base_time=0645`


const JejuWeather = () => {
    const [tdata, setTdata] = useState([]);
    const category = [
        { name: "한림읍", nx: 48, ny: 36 },
        { name: "애월읍", nx: 49, ny: 37 },
        { name: "제주시", nx: 53, ny: 38 },
        { name: "중문동", nx: 51, ny: 32 },
        { name: "서귀포시", nx: 52, ny: 33 },
        { name: "성산읍", nx: 60, ny: 37 },
        { name: "조천읍", nx: 55, ny: 38 },
        { name: "구좌읍", nx: 57, ny: 38 },
        { name: "남원읍", nx: 60, ny: 33 },
        { name: "표선면", nx: 62, ny: 33 },
        { name: "대정읍", nx: 48, ny: 31 },
        { name: "안덕면", nx: 50, ny: 32 },
        { name: "한경면", nx: 47, ny: 35 }
    ];
    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();//현재 시각
            const base_date = date.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD

        const promises = category.map(async (item) => {
            let categoryUrl = `${url}&base_date=${base_date}&nx=${item.nx}&ny=${item.ny}`;


            try {
                const { data } = await axios.get(categoryUrl);
                const itemData = data?.response?.body?.items?.item;

                return {
                    location: item.name,
                    weather: itemData,
                };
            } catch (error) {
                console.error(`${item.name} 날씨 가져오기 실패:`, error);
                return {
                    location: item.name,
                    weather: null,
                };
            }
        });

            const results = await Promise.all(promises);
            setTdata(results); // 전부 모아서 set
            console.log("전체 지역 날씨:", results);
        };

        fetchData(); // 데이터 가져오기 실행
    }, []);

    return (
        <section>
            <WeatherList data={tdata} />
        </section>
    );
};

export default JejuWeather;

