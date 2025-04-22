import IconImage from "./IconImage";
import {IoCaretDownOutline, IoCaretUpOutline} from "react-icons/io5";

export default function LiveCurrency({name, code, exchange, updown, point}) {

    return (
        <div className={`w-full h-24 bg-white rounded-lg flex justify-between items-center p-6 `}>
            <div className={`flex items-center justify-center gap-3`}>
                <IconImage imageSrc={`/img/${code}.png`} className={` w-6 xs:w-8 border border-textLightGray`} title={`국기`}/>
                <p className={`text-base break-keep `}>{name}</p>
            </div>

            <div className={`flex flex-col items-end`}>
                <p className={`pb-1 text-base whitespace-nowrap`}>{exchange}원</p>
                <div className={`flex items-center gap-4 text-xs xs:text-sm whitespace-nowrap`}>
                    <p className={`text-textGray font-light`}>전일대비</p>

                    <p
                        className={`${updown === "+"
                            ? "text-red-600"
                            : updown === "-"
                                ? "text-blue-600"
                                : "text-textGray"} flex items-center gap-1`}
                    >
                        {updown === "+" ? (
                            <IoCaretUpOutline className="text-lg"/>
                        ) : updown === "-" ? (
                            <IoCaretDownOutline className="text-lg"/>
                        ) : (
                            <span className="text-lg">-</span>
                        )}
                        <span>{point}원</span>
                    </p>


                </div>
            </div>

        </div>
    );
};