import IconImage from "./IconImage";

export default function InfoComponent2({title, txt, txt2, imageSrc, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`w-full ${wrapClass} `}
        >
            <div
                onClick={onClick}
                className={`w-full h-28 sm:h-36 rounded-lg overflow-hidden 
            `}>
                <IconImage imageSrc={imageSrc} className={`w-full h-full object-cover  ${imgClass}`} title={title}/>
            </div>

            <div className={`${txtWrapClass} text-textBlack`}>
                <p className={`text-xs pt-1.5 pb-0.5 text-gray-500 ${txtClass}`}>{txt}</p>
                <p className={`text-base multi-ellipsis font-semibold ${titleClass}`}>{title}</p>
                <p className={`text-sm multi-ellipsis ${txt2Class}`}>{txt2}</p>
            </div>

        </div>
    );
};
