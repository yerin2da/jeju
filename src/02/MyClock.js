import MyClockImage from "./MyClockImage";
import MyClockTime from "./MyClockTime";
import './MyClock.css';
function MyClock() {
    return(
        <div className={`c1 `}>
            <MyClockImage/>
            <MyClockTime/>
        </div>
    )
}

export default MyClock;