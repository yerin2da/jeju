import ToggleContent from "../components/ToggleContent";
import { FiPlus, FiMinus } from "react-icons/fi";
import WeekCalendar from "../components/MyDatePicker";
import MyTimePicker from "../components/MyTimePicker";
import MyDatePicker from "../components/MyDatePicker";
import Typography from "../components/Typography";

export default function Sell() {
    const toggleItems = [
        { title: "날짜 선택", txt: "거래할 날짜를 선택하세요.", content: <WeekCalendar /> },
        { title: "화폐 옵션 선택", txt: "거래할 화폐를 선택하세요.", content: <div>가나다</div> },
        { title: "장소 선택", txt: "거래할 장소를 정해주세요.", content: <div>라마바</div> },
    ];

    return (
        <div className="w-full px-5">
            {toggleItems.map((item, i) => (
                <ToggleContent
                    key={i}
                    title={item.title}
                    txt={item.txt}
                    iconOpen={FiPlus}
                    iconClose={FiMinus}
                >
                    {item.content} {/* ✅ 각 항목에 맞는 children 전달 */}
                </ToggleContent>
            ))}
            <MyDatePicker/>
            <Typography as="p" variant="sm" className={`text-textDarkGray pb-2`}>거래 가능 시간</Typography>
            <MyTimePicker/>
        </div>
    );
};
