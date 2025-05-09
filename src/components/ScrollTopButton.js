import { useEffect, useState } from "react";
import { IoIosArrowDropup } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollTopButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const scrollContainer = document.querySelector("main");

        const handleScroll = () => {
            if (!scrollContainer) return;
            setShow(scrollContainer.scrollTop > 200);
        };

        scrollContainer?.addEventListener("scroll", handleScroll);
        return () => scrollContainer?.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const scrollContainer = document.querySelector("main");
        scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        show && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-20 right-4 z-50 bg-mainColor text-white p-3 rounded-full shadow-md hover:bg-green-800"
                aria-label="위로 가기"
            >
                <FaArrowUp className="text-lg" />
            </button>
        )
    );
}
