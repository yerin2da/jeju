import styles from './MyClockTime.module.css';
import {useEffect, useState} from "react";
function MyClockTime() {
    const [cTime, setCTime] = useState(new Date());

    useEffect(() => {
        const tm = setInterval(()=>{
            setCTime(new Date());
        },1000);

        return () =>{
            clearInterval(tm)
        }
    }, []);

    return(
        <div className={styles.c3}>
            현재시각 : {cTime.toLocaleTimeString()}
        </div>
    );
}

export default MyClockTime;