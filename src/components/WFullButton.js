export default function WFullButton({onClick, tit='', tit2=''}) {
    return (
        <div
            onClick={onClick}
            className={`w-full border border-gray-300  rounded-md flex items-center justify-center gap-1 py-1 mt-3`}>
            <div className={`font-semibold`}>{tit}</div>
            <div>{tit2}</div>
        </div>
    );
};