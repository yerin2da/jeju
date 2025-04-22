import TailButton from "../UI/TailButton";
import Ball from "./Ball";
import {useState} from "react";

export default function Lotto() {
    const [tags , setTags] = useState([]);
    const handleOK = () =>{
        let arr = [];
        while(arr.length <7){
            let n = Math.floor(Math.random() * 45) +1;

            if(!arr.includes(n)) arr.push(n);
        }

        let bonus = arr.splice(-1);//배열의 마지막 요소를 삭제하면서 해당 요소를 배열로 반환합니다.
        arr.sort((a,b) => a - b);//sort()문자열 기준 정렬을 수행하기 때문에, 숫자를 올바르게 정렬하려면 비교 함수를 제공해야 함
        //비교 함수 (a, b) => a - b:오름차순
        console.log(arr,bonus);

        let tm = arr.concat(bonus);//7개
        tm = tm.map( item => <Ball n={item} key={`b${item}`}/>)

        tm.splice(6,0,<span className={`text-3xl mx-2`} key={`sp`}>+</span>)//0:앞에것을 삭제하지 않겠다
        setTags(tm);
    }
    return (
        <div className="w-full flex flex-col justify-center items-center ">
            <div>
                {tags}
            </div>
            <div>
                <TailButton caption="LottoBtn" bcolor='blue' handleClick={handleOK}/>
            </div>

        </div>
    );
};