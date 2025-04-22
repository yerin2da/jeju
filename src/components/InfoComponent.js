import IconImage from "./IconImage";
export default function InfoComponent({title, txt, icon_name, wrapClass='', titleClass='', txtClass='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`p-3 bg-white rounded-xl w-full xs:h-32 flex flex-col items-center xs:items-start justify-around shadow-shadowBase h-[7rem] ${wrapClass} ;`}>
            <IconImage imageSrc={`/img/${icon_name}.png`} className={`w-[2.5rem] pb-2 ${imgClass}`} title={title}/>
            <p className={`text-base font-medium text-textBlack ${titleClass}`}>{title}</p>
            <p className={`text-xs xs:text-sm hidden xs:block text-gray-500 ${txtClass}`}>{txt}</p>
        </div>
    );
};
