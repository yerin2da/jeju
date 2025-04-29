import SectionTitle from "../../components/SectionTitle";
import { useNavigate} from "react-router-dom";
import InfoComponent2 from "../../components/InfoComponent2";
import axios from "axios";
import {useEffect, useState} from "react";
import {FiMapPin} from "react-icons/fi";
import WFullButton from "../../components/WFullButton";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
export default function JejuFestival() {
    const [tdata, setTdata] = useState([])//전체 데이터

    useEffect(() => {
        const getFetchData = async () => {
            try {
                const { data } = await axios.get(`${apiBaseUrl}/api/jeju-festival`, {
                    params: {
                        page:1,
                        locale:"ko",
                        category:"c5",
                    },
                    headers: {
                        Accept: "application/json"
                    }

                });

                const data4 = data.items.slice(0, 6);//4개만 보여주기
                setTdata(data4);
                console.log('축제&행사 응답데이터 : ', data4);

            } catch (error) {
                console.error('api응답 실패 :', error);
            }
        };

        getFetchData();
    }, []);

    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`festival/gallery?category=c5&content=${code}`);
    };


    return (
        <section>
            {/*섹션제목*/}
            <SectionTitle
                icon={
                <picture>
                    <source
                        srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3a1/512.webp"
                        type="image/webp"
                    />
                    <img
                        src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f3a1/512.gif"
                        alt="🎡"
                        width="25"
                        height="25"
                    />
                </picture>
            }
                title={<>제주에서 <span className={`text-mainColor`}>즐기자!</span></>}
            />
            <ul className={`grid grid-cols-2 xs:grid-cols-3 gap-x-2 gap-y-4 items-stretch`}>
                {tdata.map((item, idx) => {
                    const imgPath = item?.repPhoto?.photoid?.imgpath;
                    const imgThumPath = item?.repPhoto?.photoid?.thumbnailpath;
                    const default2 = `${process.env.PUBLIC_URL}/img/default2.jpg`;

                    return (
                        <li key={idx} className={`flex`}>
                            <InfoComponent2
                                onClick={() => handleClick(item.contentsid)}

                                imageSrc={imgThumPath || imgPath || default2}
                                title={item?.title}
                                txt={
                                <span className={`flex items-center`}>
                                    <FiMapPin/>{item?.region1cd?.label} {item?.region2cd?.label}
                                </span>
                                }
                                txt2={item?.introduction}
                            />
                        </li>
                    );
                })}
            </ul>

            <WFullButton
                onClick={()=> navigate(`guide/gallery/c5`)}
                tit={`축제&행사모음`}
                tit2={`전체보기`}
            />

        </section>
    );
};