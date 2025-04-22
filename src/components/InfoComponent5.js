
export default function InfoComponent5({title, txt, txt2, icon_name, wrapClass='', txtWrapClass='', titleClass='', txtClass='', txt2Class='', imgClass='' ,  onClick=null}) {
    return (
        <div
            onClick={onClick}
            className={`bg-center bg-no-repeat text-white relative overflow-hidden ${wrapClass} bg-cover `}
            style={{
                backgroundImage: `url('/img/${icon_name}.jpg')`,
                // backgroundPosition: '60% top', // ← 왼쪽에서 조금 오른쪽으로 이동
            }}>
            <div className="absolute left-0 bottom-0 w-3/4 h-full bg-[linear-gradient(to_right,_#3BBD2A_50%,_rgba(255,255,255,0)_100%)] flex items-center px-3 z-1"/>


            <div className={`${txtWrapClass} relative z-2`}>
                <p className={`text-lg font-semibold ${titleClass}`}>{title}</p>
                <p className={`text-xs ${txtClass}`}>{txt}</p>
            </div>

        </div>
)
    ;
};
