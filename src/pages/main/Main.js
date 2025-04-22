
import JejuWeather from "./JejuWeather";
import JejuGuide from "./JejuGuide";
import MainVisual from "./MainVisual";
import JejuFestival from "./JejuFestival";
import JejuTheme from "./JejuTheme";
import JejuMusic from "./JejuMusic";

export default function Main() {

    return (
        <div className='w-full'>
            <MainVisual/>
            <JejuGuide/>
            <JejuTheme/>
            <JejuMusic/>
            <JejuWeather/>
            <JejuFestival />
        </div>
    );
};