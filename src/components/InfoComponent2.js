import IconImage from "./IconImage";

export default function InfoComponent2({title, txt, txt2, imageSrc, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`w-full ${wrapClass} `}
        >
            <div
                onClick={onClick}
                className={`w-full rounded-lg overflow-hidden 
            `}>
                <IconImage imageSrc={imageSrc} className={`object-cover  ${imgClass}`} title={title}/>
            </div>

            <div className={`${txtWrapClass} text-textBlack`}>
                <p className={`text-xs py-2 ${txtClass}`}>{txt}</p>
                <p className={`text-base multi-ellipsis ${titleClass}`}>{title}</p>
                <p className={`text-sm multi-ellipsis ${txt2Class}`}>{txt2}</p>
            </div>

        </div>
    );
};
