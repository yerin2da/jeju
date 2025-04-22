import {FaCheckCircle} from "react-icons/fa";

export default function ToggleCheckIcon({isChecked, onClick, className, btnColor}) {

    return (
        <FaCheckCircle
            className={`${isChecked ? `text-${btnColor}` : "text-textLightGray"} ${className}`}
            onClick={onClick}
        />
    );
};