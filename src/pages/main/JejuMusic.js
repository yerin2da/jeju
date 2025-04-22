import TailButton from "../../UI/TailButton";
import {useNavigate} from "react-router-dom";
import InfoComponent6 from "../../components/InfoComponent6";
import SectionTitle from "../../components/SectionTitle";
import BorderComponent from "../../components/BorderComponent";

export default function JejuMusic() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`/${code}/gallery?`);
    };

    return (
        <section className={`w-full`}>
            {/*섹션제목*/}
            <SectionTitle
                icon={`🎼`}
                title={<>눈과 귀가 <span className={`text-mainColor`}>황홀한</span>순간</>}
            />

            <div className={`flex items-center gap-2 h-40`}>
                <InfoComponent6
                    onClick={() => handleClick('musical')}
                    icon_name={`musical`}
                    title={
                        <>
                            무대 위 감동 한 편 <br />
                            지금, 뮤지컬 속으로
                        </>
                    }
                    txt={`#베스트 #화려한 조명`}
                    txt2={<BorderComponent text={`더보기`}/>}
                    bg_Color={`bg-[linear-gradient(45deg,_#C49E37_5%,_rgba(255,255,255,0)_100%)] `}
                />

                <InfoComponent6
                    onClick={() => handleClick('music')}
                    icon_name={`music`}
                    title={<>
                        소리로 전하는<br/>
                        마음의 떨림을 찾아서
                    </>}
                    txt={`#인기 #음악 연주회`}
                    txt2={<BorderComponent text={`더보기`}/>}
                    bg_Color={`bg-[linear-gradient(45deg,_#24567B_5%,_rgba(255,255,255,0)_100%)] `}
                />

            </div>


        </section>
    );
};