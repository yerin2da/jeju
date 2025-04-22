import {useState} from "react";

// 여닫기
export default function useToggleOpen() {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(prev => (prev === index ? null : index));
    }

    return { openIndex, handleToggle };
};