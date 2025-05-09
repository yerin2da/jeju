import { MdHomeFilled } from "react-icons/md";
import {FaBars} from "react-icons/fa6";
import {IoSearch} from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import NavIcon from "../components/NavIcon";
import React from "react";
// import {useLocation} from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import ScrollTopButton from "../components/ScrollTopButton";
export default function MainBar() {

    return (
        <>
            {/*top버튼*/}
            <ScrollTopButton />

            <footer className="w-full flex justify-around fixed bottom-0 z-50 bg-white shadow-shadowBottom max-w-screen-md mx-auto">
                {/*네비*/}
                    <NavIcon to="/" Icon={MdHomeFilled} label={'홈'}/>
                    <NavIcon to="/mainSearch"
                             Icon={IoSearch}
                             label={'검색'}
                    />
                    <NavIcon to="/heart" Icon={ FaRegHeart } label={'찜'} className={`scale-x-[0.9] scale-y-[0.9]`}/>
                    <NavIcon to="/mypage" Icon={ MdOutlinePersonOutline } label={'내정보'} className={`scale-x-[1.1] scale-y-[1.1]`}/>
                    <NavIcon to="/mainMenu" Icon={FaBars} label={'전체'} className={`scale-x-[0.8] scale-y-[0.8]`}/>

            </footer>
        </>
    );
}
