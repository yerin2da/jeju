import IconImage from "./IconImage";

export default function InfoComponent2({title, txt, txt2, imageSrc, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`w-full ${wrapClass} `}
        >
            <IconImage imageSrc={imageSrc} className={`object-cover  ${imgClass}`} title={title}/>

            <div className={`${txtWrapClass} text-textBlack`}>
                <p className={`text-base  ${titleClass}`}>{title}</p>
                <p className={`text-xs  ${txtClass}`}>{txt}</p>
                <p className={`text-sm  ${txt2Class}`}>{txt2}</p>
            </div>

        </div>
    );
};
