import Typography from "./Typography";
import { FaCheckCircle } from "react-icons/fa";
export default function ToggleContent({title, subtitle, txt, className, children,
                                          iconOpen:IconOpen, iconClose:IconClose, iconCheck:IconCheck,
                                          isFilled=null, isOpen, onToggle,titClassName="", subTitClassName="", titWrapClassName="" ,hiddenConClassName =""})
{
    return (
        <div className={`contentsBox bg-white sm:py-10`}>
            <div className={` flex justify-between items-start`}>
                <div className={``}>
                    <div className={`flex items-center pb-2 ${titWrapClassName}`}>
                        {isFilled !== null && (
                            <FaCheckCircle className={`text-xl ${isFilled ? "text-subColor2" : "text-textLightGray"}`}/>
                        )}
                        <p className={`font-semibold text-lg ${titClassName}`}>{title}</p>
                        <p className={`text-subColor2 text-xs ${subTitClassName}`}>{subtitle}</p>
                    </div>
                    <p className={`text-sm text-textGray`}>{txt}</p>
                </div>

                <div className={`flex flex-col items-end`}>
                    {isOpen ? (
                        IconClose && <IconClose className="text-3xl text-textDarkGray cursor-pointer" onClick={onToggle}/>
                    ) : (
                        IconOpen && <IconOpen className="text-3xl text-textBlack cursor-pointer" onClick={onToggle}/>
                    )}
                </div>
            </div>
            {isOpen && <div className={`visible ${hiddenConClassName}`}>{children}</div> }
        </div>
    );

};