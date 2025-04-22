import RecoilMyDiv3 from "./RecoilMyDiv3";


// export default function RecoilMyDiv2(props) {
export default function RecoilMyDiv2({dn1, dn2, dn3}) {//구조분해할당


    return (
        <div className="flex flex-col p-5 m-10 w-3/4 h-3/4 bg-lime-700 text-white
                        justify-center items-center
        ">
            <div className="w-full h-10 flex justify-start items-center">
                {/*{`${props.dn1} ${props.dn2}`}*/}
                {`${dn1} ${dn2}`}
            </div>
            {/*<RecoilMyDiv3 d1={props.dn1} d2={props.dn2} d3={props.dn3}/>*/}
            <RecoilMyDiv3 d1={dn1} d2={dn2} d3={dn3}/>

        </div>
    );
};