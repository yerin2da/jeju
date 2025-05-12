
export default function InfoComponent5({title, txt, txt2, icon_name, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer bg-center bg-no-repeat text-white relative overflow-hidden ${wrapClass} bg-cover
            group 
            `}
            >
            {/* 배경 이미지 확장 영역 */}
            <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                style={{
                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/${icon_name}.jpg')`,
                }}
            />
            <div className="absolute left-0 bottom-0 w-3/4 h-full bg-[linear-gradient(to_right,_#3BBD2A_50%,_rgba(255,255,255,0)_100%)] flex items-center px-3 z-1"/>


            <div className={`${txtWrapClass} relative z-2`}>
                <p className={`text-lg font-semibold ${titleClass}`}>{title}</p>
                <p className={`text-xs ${txtClass}`}>{txt}</p>
            </div>

        </div>
)
    ;
};
