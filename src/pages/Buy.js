// import Traffic from "../06/Traffic";
// import CountrySelTab from "../components/CountrySelTab";

import Gallery2 from "../08/Gallery2";
import GalleryCard from "../components/GalleryCard";
import React from "react";
import SearchCard from "./SearchCard";


export default function Buy() {
    return (
        <div className={`bg-midBlack`}>
            {/*필터*/}
            <div className={`p-5 pt-0`}>
                <SearchCard/>
            </div>

            {/*거래내역 박스*/}
            <div className={`p-5 bg-mainBg`}>

                <div className={`text-xs text-left pb-3 text-gray-500`}>전체 33개의 글</div>

                {/*흰색카드*/}
                <GalleryCard/>
            </div>

        </div>
    );
};