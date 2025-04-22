// export default function RecoilMyDiv3(props) {
export default function MyDiv3({d1, d2, d3}) {
    return (
        <div className="flex flex-col p-5 m-10 w-3/4 h-3/4 bg-lime-500 text-white">
            <div className="w-full h-10 flex justify-start items-center">
                {/*{`${props.d1} ${props.d2} ${props.d3}`}*/}
                {`${d1} ${d2} ${d3}`}
            </div>
        </div>
    );
};