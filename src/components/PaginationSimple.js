import React from 'react';
import TailButton from "../UI/TailButton";

const PaginationSimple = ({ currentPage, totalPages, setCurrentPage }) => {
    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 pt-5 text-sm">
            <TailButton
                caption="이전"
                handleClick={handlePrev}
                disabled={currentPage === 1}
                bcolor="blue"
            />
            <span className="text-textBlack">{currentPage} / {totalPages}</span>
            <TailButton
                caption="다음"
                handleClick={handleNext}
                disabled={currentPage === totalPages}
                bcolor="blue"
            />
        </div>
    );
};

export default PaginationSimple;
