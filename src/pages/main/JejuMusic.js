
import {useNavigate} from "react-router-dom";
import InfoComponent6 from "../../components/InfoComponent6";


export default function JejuMusic() {
    const navigate = useNavigate();

    const handleClick = (code) => {
        navigate(`/stage/gallery/${code}`);
    };

    return (
        <section className={`w-full `}>

            <div className={`w-full h-36`}>
                <InfoComponent6
                    onClick={() => handleClick('music')}
                    icon_name={`music`}
                    title={<>
                        소리로 전하는<br/>
                        마음의 떨림을 찾아서
                    </>}
                    txt={<>#지금 인기 #음악 연주회 <br />#지금 감상하러 가기</>}
                    // txt2={<BorderComponent text={`더보기`}/>}
                    bg_Color={`bg-[linear-gradient(30deg,_#24567B_5%,_rgba(255,255,255,0)_100%)] `}
                />

            </div>

        </section>
    );
};