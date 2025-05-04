import data from "../../db/data.json";
import {useNavigate} from "react-router-dom";
export default function MainMenu() {
const navigate = useNavigate();
    return (
        <div className="">
            <ul>
                <li>제주 가이드</li>
                {data.jejuCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={()=>navigate(`/guide/gallery/${item.code}`)}
                        className={`cursor-pointer`}>
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>

            <ul>
                <li>제주 테마여행</li>
                {data.jejuThemeCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={()=>navigate(`/theme/gallery/${item.code}`)}
                        className={`cursor-pointer`}>
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>

            <ul>
            <li>제주 스테이지</li>
                {data.jejuStageCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={()=>navigate(`/stage/gallery/${item.code}`)}
                        className={`cursor-pointer`}
                    >
                        <div>{item.label}</div>
                    </li>
                ))}
            </ul>


        </div>
    );
};