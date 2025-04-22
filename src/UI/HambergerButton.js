import { FaBars } from "react-icons/fa6";


export default function HambergerButton({className}) {
    return (
        <FaBars className={`cursor-pointer ${className}`} />
    );
}
