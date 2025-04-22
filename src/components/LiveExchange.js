import IconImage from "./IconImage";

export default function LiveExchange({name, code, exchange,}) {
    return (
        <div className={`w-full h-24 bg-white rounded-lg flex justify-between items-center p-6 `}>
            <div className={`flex items-center justify-center gap-3`}>
                <IconImage imageSrc={`/img/${code}.png`} className={` w-6 xs:w-8 border border-textLightGray`} name={name}/>
                <p className={`text-base`}>{name}</p>
            </div>

            <div className={`flex flex-col items-end`}>
                <p className={`pb-1 text-base`}>{exchange}</p>
                <div className={`flex items-center gap-4 text-xs xs:text-sm`}>
                    <p className={`text-textGray font-light`}>전일대비</p>
                    <p className={``}></p>
                </div>
            </div>

        </div>
    );
};