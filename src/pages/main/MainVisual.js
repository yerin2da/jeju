import TailButton from "../../UI/TailButton";
import {useNavigate} from "react-router-dom";
import InfoComponent5 from "../../components/InfoComponent5";

export default function MainVisual() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/stage/gallery/exhibition`);
    };

    return (
        <section className={`!pt-0`}>
            <InfoComponent5
                onClick={() => handleClick()}
                icon_name={`mainBanner`}
                title={
                    <>
                        쌓인 피로가 싹 - <br />
                        눈은 즐겁고 마음은 가벼워지는 <br />
                        제주 BEST 전시
                    </>
                }
                txt={<TailButton
                    caption={`지금 보러가기`}
                    bcolor={`btn-lightPurple`}
                    className={`!h-10 !text-[#266D00] !bg-[#E6F8DD] !font-bold !px-6`}
                />}
                wrapClass=" h-fit rounded-xl px-8 py-6"
                txtWrapClass="w-full space-y-4"
                titleClass=""
                txtClass=""
            />
        </section>
    );
};