
export default function InfoComponent6({title,
                                       txt,
                                       txt2,
                                       icon_name,
                                       bg_Color='',
                                       onClick=null})
{
    return (
        <div
            onClick={onClick}
            className={`
                rounded-xl bg-center bg-no-repeat 
                text-white relative overflow-hidden 
                bg-cover w-full h-full
                flex items-center justify-center
            `}
            style={{
                backgroundImage: `url('/img/${icon_name}.jpg')`,
            }}>
            <div className={`absolute left-0 bottom-0 w-full h-full ${bg_Color} z-1`}/>

            <div className={`relative z-2 space-y-2`}>
                <p className={`text-base font-bold`}>{title}</p>
                <p className={`text-xs`}>{txt}</p>
                <p className={`text-sm`}>{txt2}</p>
            </div>

        </div>
)
    ;
};
