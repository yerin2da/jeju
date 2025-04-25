
export default function InfoComponent6({title,
                                       txt,
                                       icon_name,
                                       bg_Color='',
                                       onClick=null})
{
    return (
        <div
            onClick={onClick}
            className={`
                rounded-2xl bg-center bg-no-repeat 
                text-white relative overflow-hidden 
                bg-cover w-full h-full
                flex items-center justify-start p-5
            `}
            style={{
                backgroundImage: `url('${process.env.PUBLIC_URL}/img/${icon_name}.jpg')`,
            }}>
            <div className={`absolute left-0 bottom-0 w-full h-full ${bg_Color} z-1`}/>

            <div className={`relative z-2`}>
                <div className={`text-lg font-semibold pb-1`}>{title}</div>
                <div className={`text-sm font-light`}>{txt}</div>
            </div>

        </div>
)
    ;
};
