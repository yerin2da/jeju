export default function WFullButton({onClick, tit='', tit2=''}) {
    return (
        <div
            onClick={onClick}
            className={` cursor-pointer w-full bg-white border border-gray-200 rounded-md flex items-center justify-center gap-1 py-2 mt-6`}>
            <div className={`font-semibold`}>{tit}</div>
            <div>{tit2}</div>
        </div>
    );
};