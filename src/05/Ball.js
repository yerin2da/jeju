export default function Ball({n}) {
    const colorN ={
        "b0" : "bg-orange-600",
        "b1" : "bg-lime-600",
        "b2" : "bg-sky-600",
        "b3" : "bg-violet-600",
        "b4" : "bg-rose-600",
    }

    /*${colorN["b"+ Math.floor(n / 10recoil&localstorage)]}*/
        //대괄호 표기법 (Bracket Notation):
        // 속성 이름이 동적으로 결정될 때 사용합니다.
        // javascript
        // 복사
        // 편집
        // const obj = { key: "value" };
        // const dynamicKey = "key";
        // console.log(obj[dynamicKey]); // "value"
    return (
        <div className={`inline-flex w-16 h-16 mx-2 justify-center items-center rounded-full text-2xl font-bold text-white
                        ${colorN["b"+ Math.floor(n / 10)]}
                        
                        `
        }>
            {n}
            
        </div>
    );
};