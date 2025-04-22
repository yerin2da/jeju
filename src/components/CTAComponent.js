import { FiPlus} from "react-icons/fi";

export default function CTAComponent({title, txt_en, className}) {
    return (
        <div className={`p-5 text-white rounded-2xl h-32 sm:h-36 flex justify-between items-start hover:opacity-75 ${className}`}>
            <div className="">
                <p className={`text-xl font-semibold xs:text-2xl`}>{title}</p>
                <p className={`text-base`}>{txt_en}</p>
            </div>
            <div className="self-end text-4xl">
                <FiPlus />
            </div>
        </div>
    );
};