import React, { useState } from "react";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {useRecoilState} from "recoil";
import {timeAtom} from "../recoil/atoms";

export default function MyTimePicker() {
    const [time, setTime] = useRecoilState(timeAtom);
    const onTimeChange = (newTime) => {
        setTime(newTime); // ✅ Recoil에 저장
    };

    return (
        <TimePicker
            onChange={onTimeChange}
            value={time}
            format="a hh:mm"  //AM/PM + 12시간제
            disableClock={true}
            showLeadingZeros={true}
            clearIcon={null}
        />
    );
}
