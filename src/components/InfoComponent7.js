import MoreButton from "./MoreButton";

export default function InfoComponent7({title,
                                           txt,
                                           icon_name,
                                           onClick=null})
{
    return (
        <div className={`h-56 space-y-3`}>
            <div
                onClick={onClick}
                className={`
                rounded-xl bg-center bg-no-repeat 
                text-white relative 
                bg-cover w-full h-40 p-3 
            `}
                style={{
                    backgroundImage: `url('${process.env.PUBLIC_URL}/img/${icon_name}.jpg')`,
                }}>
                <div className={`relative z-2 w-fit text-sm bg-mainColor text-white  px-4 py-1 rounded-sm`}>{title}</div>
            </div>

            <div className={`flex items-center justify-between`}>
                <div className={`text-base font-semibold whitespace-pre-line `}>{txt}</div>
                <MoreButton/>
            </div>
        </div>
    )
        ;
};
