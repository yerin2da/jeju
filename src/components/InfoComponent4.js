import IconImage from "./IconImage";

export default function InfoComponent4({title, txt, icon_name, wrapClass='', titleClass='', txtClass='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`w-full aspect-square`}
        >
            <div className={`bg-mainBg rounded-lg mb-2`}>
                <IconImage imageSrc={`${process.env.PUBLIC_URL}/img/${icon_name}.png`} className={` ${imgClass}`} title={title}/>
            </div>
            <p className={`text-center text-lg font-medium text-textBlack ${titleClass}`}>{title}</p>

        </div>
    );
};
