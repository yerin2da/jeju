import TailButton from "../UI/TailButton";
import {useEffect, useRef, useState} from "react";

export default function MyRef() {
    let cVal = 0;
    const [sVal, setSval]= useState(0)
    const rVal = useRef(0)
    // 값은 유지되지만, 값이 변경되어도 컴포넌트를 다시 렌더링하지 않음

    const handleC = () =>{
        cVal = cVal +1
        console.log('컴포넌트변수 :',cVal)
    }

    const handleS = () =>{
        setSval(sVal + 1)
    }

    const handleR = () =>{
        rVal.current = rVal.current +1//current로 접근
        console.log('ref변수 : ',rVal.current);

    }

    useEffect(() => {
        console.log('state변수 : ',sVal);
    }, [sVal]);

    return (
        <div className={`w-10/12 flex justify-center items-center`}>
            <div className={`grid grid-cols-3 gap-4`}>
                <div className={`text-blue-700 font-bold text-center text-xl`}>
                    컴포넌트 변수:{cVal}
                </div>

                <div className={`text-orange-700 font-bold text-center text-xl`}>
                    State 변수:{sVal}
                </div>

                <div className={`text-lime-700 font-bold text-center text-xl`}>
                    Ref 변수:{rVal.current}
                </div>
                <div>
                    <TailButton
                        caption="컴포넌트 변수" bcolor={`blue`} handleClick={handleC}
                    />
                    <TailButton
                        caption="State 변수" bcolor={`orange`} handleClick={handleS}
                    />
                    <TailButton
                        caption="Ref 변수" bcolor={`blue`} handleClick={handleR}
                    />
                </div>
            </div>

        </div>
    );
};