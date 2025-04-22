
import SectionTitle from "../../components/SectionTitle";
import {useNavigate} from "react-router-dom";
import data from "../../db/data.json";
import InfoComponent4 from "../../components/InfoComponent4";

export default function JejuGuide() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`guide/gallery?category=${code}`);
    };

    return (
        <section>
            {/*섹션제목*/}
            <SectionTitle
                icon={`✈️`}
                title={<>제주 <span className={`text-mainColor`}>어디</span>부터 가볼까?</>}
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