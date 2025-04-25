import { IoIosArrowForward } from "react-icons/io";
export default function MoreButton() {
    return (
        <div className={`bg-white text-mainColor text-sm flex items-center gap-2 font-semibold w-fit px-3 py-2 rounded-sm`}>
            더보기<IoIosArrowForward />
        </div>
    );
};