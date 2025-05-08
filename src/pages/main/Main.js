
import JejuWeather from "./JejuWeather";
import JejuGuide from "./JejuGuide";
import MainVisual from "./MainVisual";
import JejuFestival from "./JejuFestival";
import JejuTheme from "./JejuTheme";
import JejuMusic from "./JejuMusic";
import JejuStage from "./JejuStage";

export default function Main() {

    return (
        <div className='w-full'>
            <MainVisual/>
            <JejuGuide/>
            <JejuTheme/>
            <JejuMusic/>
            <JejuStage/>
            {/*<JejuWeather/>*/}
            <JejuFestival />
        </div>
    );
};