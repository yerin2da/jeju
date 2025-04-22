import {IoIosCheckmarkCircleOutline} from "react-icons/io";
import {useState} from "react";

export default function CheckIcon() {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    }

    return (
        <IoIosCheckmarkCircleOutline
            className={`${isChecked ? "text-mainColor" : "text-textGray"}`}
            onClick={toggleCheck}
        />
    );
};