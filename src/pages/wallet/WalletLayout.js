// import {useParams} from "react-router-dom";
//
// export default function WalletLayout() {
//     const item = useParams().item;
//     const fruits = ['🍎', '🍌', '🍉'];
//     return (
//         <div>
//             wallet : {item}
//             {fruits.includes(item) ? '과일입니다'
//                                    : '과일이 아닙니다'
//             }
//         </div>
//     );
// };

import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { useRecoilValue } from "recoil";
// import data from "../../db/data.json";
import TabMenuSlider from "../../components/TabMenuSlider";
import {nicknameState} from "../../recoil/atoms";


export default function WalletLayout() {
    const nickname = useRecoilValue(nicknameState); //닉네임

    const navigate = useNavigate();
    const location = useLocation();

    const selC1 = location.pathname.includes('exchangeList') ? 'exchangeList' : 'myCoin';

    const handleSelC1 = (code) => {
        navigate(`/wallet/${code}`);
    };

    return (
        <div className="w-full flex flex-col flex-1 bg-white">


            <div className={`sticky top-0 z-10 bg-white px-5 pb-5`}>
                {/*프로필 랩*/}
                <div className={`w-full flex items-center justify-between text-lg font-bold pb-6`}>
                    {/*레벨*/}
                    <p>{nickname}님은<br/><span className={`text-mainColor`}>Lv.10</span> 등급<br/>입니다</p>

                    {/* 프로필 이미지 */}
                    <div className="w-16 h-16 rounded-full bg-gray-200 border"></div>
                </div>

                {/* 대분류 탭 */}
                <div className={`w-full bg-gray-100 rounded-full px-3`}>
                    <TabMenuSlider
                        spaceBetween={0}
                        data={data.walletCategory}
                        onClick={() => handleSelC1}
                        selTab={selC1}
                        slideClass={`!w-1/2`}
                        btnClass={`w-full py-2 my-2 text-center`}
                        tClass={`bg-white text-black shadow-md shadow-gray-200`}
                        fClass={`text-gray-500`}
                    />
                </div>
            </div>

            <Outlet /> {/* 하위 페이지 렌더링 */}
        </div>
    );
};