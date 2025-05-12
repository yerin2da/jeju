
export default function InfoComponent3({title, txt, txt2, icon_name, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`group p-4 bg-center bg-no-repeat text-white relative overflow-hidden ${wrapClass} bg-cover `}
            >
            {/* 배경 이미지 확장 영역 */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/${icon_name}.jpg')`,
                }}
            />

            <div className={`absolute left-0 bottom-0 w-full h-full flex items-end p-3 bg-gradient-to-t from-black/80 to-transparent`}>

                <div className={`${txtWrapClass} `}>
                    <p className={`text-base  ${titleClass} multi-ellipsis2`}>{title}</p>
                    <p className={`text-xs ${txtClass}`}>{txt}</p>
                </div>
            </div>
        </div>
    );
};
