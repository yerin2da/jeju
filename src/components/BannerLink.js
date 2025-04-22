import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export default function BannerLink({ to, text }) {
    return (
        <Link to={to} className="py-2 flex items-center text-2xl ">
            <p className={`text-2xl font-semibold`}>{text}</p>
            {to === "/login" && <IoIosArrowForward/>}
        </Link>
    );
}