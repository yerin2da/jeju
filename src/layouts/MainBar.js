import { MdHomeFilled } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
// import { GiTwoCoins } from "react-icons/gi";
import { ScanFace } from "lucide-react";
import NavIcon from "../components/NavIcon";
// import {useLocation} from "react-router-dom";

export default function MainBar() {

    return (

        <footer className="w-full flex justify-around fixed bottom-0 z-50 bg-white shadow-shadowBottom  max-w-screen-md mx-auto">
            <NavIcon to="/" Icon={MdHomeFilled} label={'홈'}/>
            <NavIcon to="/wallet"
                     Icon={FaWallet}
                     className={`scale-x-[0.8] scale-y-[0.8]`}
                     label={'내 지갑'}
            />
            <NavIcon to="/buy" Icon={ ScanFace } label={'동전리스트'}/>
            <NavIcon to="/mypage" Icon={IoPersonCircleSharp} label={'내 정보'}/>
        </footer>
    );
}
