
import SectionTitle from "../../components/SectionTitle";
import {useNavigate} from "react-router-dom";
import data from "../../db/data.json";
import InfoComponent4 from "../../components/InfoComponent4";

export default function JejuGuide() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`/guide/gallery/${code}`);
    };

    return (
        <section>
            {/*섹션제목*/}
            <SectionTitle
                icon={<picture>
                    <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4f8/512.webp" type="image/webp"/>
                    <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4f8/512.gif" alt="📸" width="25" height="25"/>
                </picture>}
                title={<div>제주 <span className={`text-mainColor`}>어디</span>부터 가볼까?</div>}
            />

            {/* 컨텐츠 박스 */}
            <ul className={`w-full grid grid-cols-4 gap-2`}>

                {data.jejuCategory.slice(0,4).map((item, idx) =>
                <li key={idx}
                    className={``}
                >
                    <InfoComponent4
                        onClick={() => handleClick(item.code)}
                        icon_name={item.img}
                        title={item.label}
                        wrapClass={``}
                        imgClass={``}
                        titleClass={`text-sm font-semibold`}
                    />
                </li>
                )}
            </ul>


        </section>
    );
};