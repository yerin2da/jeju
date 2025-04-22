
import {IoIosCheckmarkCircleOutline} from "react-icons/io";

export default function FilledIcon({isFilled}) {

    return (
        <IoIosCheckmarkCircleOutline
            className={`${isFilled ? 'text-mainColor' : 'text-textGray'}`}
        />
    );
};