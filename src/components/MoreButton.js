import { IoIosArrowForward } from "react-icons/io";
export default function MoreButton({className}) {
    return (
        <div className={`${className}
         bg-white text-mainColor text-sm flex items-center gap-2 font-semibold w-fit px-3 py-2 rounded-sm
         group-hover:bg-mainColor group-hover:text-white duration-500
         `}>
            더보기<IoIosArrowForward />
        </div>
    );
};