import TailButton from "../UI/TailButton";
import {useEffect, useRef} from "react";

export default function MyRefAdd() {
    const x1 = useRef();
    const x2 = useRef();
    const x3 = useRef();

    const handleAdd = () => {
        if(!x1.current.value){
            alert('1번값 입력하세요');
            x1.current.focus();
            return;
        }
        if(!x2.current.value){
            alert('2번값 입력하세요');
            x2.current.focus();
            return;
        }

        x3.current.value = parseInt(x1.current.value) + parseInt(x2.current.value);
    }
    const handleFocus = (x) => {
        x3.current.value= "";
        x.current.value= "";

    }


    useEffect(() => {
        x1.current.focus();
    }, []);

    return (
        <div className={`w-10/12 flex justify-center items-center`}>
            <div>
                <div className={`bg-slate-50 grid grid-cols-5 gap-2 m-5 p-5`}>
                    <input type='number'
                           id='txt1'
                           className="bg-green-50 border border-gray-300 rounded-lg text-center p-2.5"
                           ref={x1}
                           onFocus={()=>handleFocus(x1)}

                    />
                    <div className={`flex items-center justify-center text-xl font-bold`}>
                        +
                    </div>

                    <input type='number' id='txt2' className="bg-green-50 border border-gray-300 rounded-lg text-center
                    p-2.5"
                           ref={x2}
                           onFocus={()=>handleFocus(x2)}
                    />

                    <TailButton caption="=" bcolor={`orange`} handleClick={handleAdd}/>

                    <input type='number' id='txt3' className="bg-green-50 border border-gray-300 rounded-lg text-center
                    p-2.5"
                           ref={x3}/>



                </div>
            </div>
        </div>
    );
};