import data from "../../db/data.json";
import {useNavigate} from "react-router-dom";
import SectionTitle from "../../components/SectionTitle";
import {
    HiOutlineShoppingBag,
    HiOutlineMap,
    HiOutlineUserGroup,
} from "react-icons/hi2";
import { TbBus } from "react-icons/tb";
import { CiForkAndKnife } from "react-icons/ci";
import { MdOutlineFestival } from "react-icons/md";
import { LiaHotelSolid } from "react-icons/lia";
import { IoMdHeartEmpty } from "react-icons/io";
import { TbMountain } from "react-icons/tb";
import { PiPersonLight } from "react-icons/pi";
import { LuTent } from "react-icons/lu";
import { HiOutlineMusicalNote } from "react-icons/hi2";
import { GiMusicalScore } from "react-icons/gi";
import { SlPicture } from "react-icons/sl";
import { RiMovie2Line } from "react-icons/ri";
import { GiPagoda } from "react-icons/gi";
import {useRecoilValue} from "recoil";
import {isLoggedInState} from "../../recoil/atoms";
import { RxPerson } from "react-icons/rx";
import { LuHotel } from "react-icons/lu";
export const iconMap = {
    shop: <HiOutlineShoppingBag />,
    map: <HiOutlineMap />,
    hotel: <LuHotel />,
    food: <CiForkAndKnife />,
    festival: <MdOutlineFestival/>,

    family: <HiOutlineUserGroup />,
    couple: <IoMdHeartEmpty />,
    tour: <TbBus />,
    hanra: <TbMountain />,
    person: <RxPerson  />,
    days2: <LuTent />,

    korMusic: <GiPagoda/>,
    play: <RiMovie2Line />,
    musical: <GiMusicalScore />,
    exhibition: <SlPicture />,
    music: <HiOutlineMusicalNote  />
};

export default function MainMenu() {
    const isLoggedIn = useRecoilValue(isLoggedInState);//로그인 상태

    const navigate = useNavigate();

    return (
        <div className="">
            <ul className={`border-b border-gray-100 pb-4 space-y-3`}>
                <li><SectionTitle title={`제주 가이드`}/></li>
                {data.jejuCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={()=>navigate(`/guide/gallery?category=${item.code}`)}
                        className={`cursor-pointer hover:text-mainColor`}>
                        <div className={`flex items-center gap-2`}>
                            {iconMap[item.img]}
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>

            <ul className={`border-b border-gray-100 py-4 space-y-3`}>
                <li><SectionTitle title={`제주 테마여행`}/></li>
                {data.jejuThemeCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={() => navigate(`/theme/gallery?category=${item.code}`)}
                        className={`cursor-pointer hover:text-mainColor`}>

                        <div className={`flex items-center gap-2`}>

                            {iconMap[item.img]}
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>

            <ul className={`border-b border-gray-100 py-4 space-y-3`}>
                <li><SectionTitle title={`제주 무대공연`}/></li>
                {data.jejuStageCategory.map((item) => (
                    <li
                        key={item.code}
                        onClick={() => navigate(`/stage/gallery/${item.code}`)}
                        className={`cursor-pointer hover:text-mainColor`}>

                        <div className={`flex items-center gap-2`}>

                            {iconMap[item.img]}
                            {item.label}
                        </div>
                    </li>
                ))}
            </ul>

            <ul className={`py-4 space-y-3`}>
                <li
                    onClick={() => navigate(`/heart`)}
                    className={`cursor-pointer hover:text-mainColor`}
                >찜
                </li>

                <li
                    onClick={() => navigate(`/mypage`)}
                    className={`cursor-pointer hover:text-mainColor`}
                >내정보
                </li>

                <li
                    onClick={() => navigate(`/login`)}
                    className={`cursor-pointer hover:text-mainColor`}
                >
                    {isLoggedIn ? "로그아웃" : "로그인"}
                </li>

                <li
                    onClick={() => navigate(`/register`)}
                    className={`cursor-pointer hover:text-mainColor`}
                >
                    {!isLoggedIn && "회원가입"}
                </li>
            </ul>


        </div>
    );
};