import { IoIosArrowBack } from "react-icons/io";
import {useNavigate} from "react-router-dom";

export default function BackButton({ caption, handleClick, className }) {
    const navigate = useNavigate();
    return (
        <div className={`text-textColor flex items-center ${className}`}>
            <IoIosArrowBack
                className="mr-3 text-3xl font-bold cursor-pointer"
                onClick={handleClick || (() => navigate(-1))}
            />
            <p className={`text-lg font-semibold`}>{caption}</p>
        </div>
    );
}
